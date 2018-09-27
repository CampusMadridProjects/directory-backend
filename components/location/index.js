/* Configs */
const Config = require('../../config');

/* Modules */
const geolib = require('geolib');

/* Constants */
const maxDistance = Config.location.maxDistance


/** allow
 *	Given a geopoint, decide if can or not access to the application
 *	@param lat
 *	@param long
 *	@return {Promise} A promise with the results data
 */
function allow(lat, long) {
	return new Promise((resolve, reject) => {
		var distance = geolib.getDistance(
		    {latitude: lat, longitude: long},
		    {latitude: 40.412406, longitude: -3.718247}
		);

		const result = {
			allow: false,
			distance: distance
		};

		// console.log('Detected distance: ' + distance)
		// console.log('Maximum allowed distance: ' + maxDistance)

		if (maxDistance === 0 || distance <= maxDistance) {
			result.allow = true;
		} else {
			console.warn('Trying to access ' + distance + ' meters away from Campus.');
		}

		resolve(result);
	});
}


module.exports = {
	allow: allow
};
