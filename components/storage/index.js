/* Configs */
const Config = require('../../config');

/* Components */
const People = require('../people');
const Startup = require('../startup');
const Org = require('../organization');

/* Constants */
const WRITER_NAME = Config.storage.writerName;
const USER_DB_FILE = Config.storage.userDbFile || 'user-db.json';
const STARTUP_DB_FILE = Config.storage.startupDbFile || 'company-db.json';
const ORG_DB_FILE = Config.storage.orgDbFile || 'org-db.json';


/* Internal functions */

/** fileReaded
 *	Execute file actions each time a file is updated
 *	@param fileData {Any} The result of require(filePath) 
 *	@param fileName {String} Name of the file
 *	@return {Promise} A promise with the file proccessing result
 */
function fileReaded(fileData, fileName) {
	console.log('[fileReaded] Starting with actions for "'+ fileName + '".');

	if (!fileName) {
		fileName = 'NO_FILE_NAME_SET';
		console.warn('[fileReaded] File name did not come!');
	}

	if (!fileData) {
		const err = '[fileReaded] Invalid file data for ' + fileName + '. Stopping execution.';
		console.error(err);
		return Promise.reject(err);
	} else if (!fileData.writer) {
		const err = '[fileReaded] Unable to detect last writer of ' + fileName + '. Stopping execution to avoid loops.';
		console.error(err);
		return Promise.reject(err);
	} else if (fileData.writer === WRITER_NAME) {
		const err = '[fileReaded] Last write was from backend. Stopping execution.';
		console.log(err);
		return Promise.resolve(err);
	} /* else {
		console.log('[fileReaded] Conditions passed. Going to switch');
	} */

	let ret;

	// Check fileName to see if we have to update people or startups
	switch(fileName) {
		case USER_DB_FILE:
			console.log('[fileReaded] People data detected. Executing update...');
			ret = People.updatePeopleData(fileData.data);
			break;
		
		case STARTUP_DB_FILE:
			console.log('[fileReaded] Startup data detected. Executing update...');
			ret = Startup.updateStartupData(fileData.data);
			break;

		case ORG_DB_FILE:
			console.log('[fileReaded] Organization data detected. Executing update...');
			ret = Org.updateOrgData(fileData.data);
			break

		default: 
			var err = '[fileReaded] No action defined for file ' + fileName;
			console.log(err);
			ret = Promise.reject(err);
	}

	return ret;
}


/* Exposed interface */

module.exports = {
	fileReaded: fileReaded
}
