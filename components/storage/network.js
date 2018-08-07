const gcs = require('@google-cloud/storage')({keyFilename: 'serviceAccount.json'});

const Controller = require('./index');

/** updateData
 *	Launched on cloud file update
 */
exports.updateData = function (object) {
	const file = gcs.bucket(object.bucket).file(object.name);
	const fileName = object.name.split('/').pop();
	const localFilename = '/tmp/' + fileName;

	// console.log('File ' + object.name + ' updated! Reading...');

	return file.download({
		  destination: localFilename,
		})
		.then((data) => {
			// TODO(CodingCarlos): Check data param to prevent errors.
			// console.log('File "' + fileName + '" read successfully! Saved in "' + localFilename + '". Reading local file...')
			return require(localFilename);
		})
		.then((fileData) => {
			// console.log('Local file read! Executing actions...')
			return Controller.fileReaded(fileData, fileName)
		})
		.then((data) => {
			console.log('All actions finished successfully.');
			if (data) {
				console.log(' --> Execution result:', data);
			} else {
				console.log(' --> Execution finished without data to log');
			}
			return true;
		})
		.catch((e) => {
			console.error('File read or actions execution caused an error:', e);
		}); 
 };
