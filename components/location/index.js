const geolib = require('geolib');
const Config = require('../config');

const maxDistance = Config.location.maxDistance

/** allow
 *	Given a geopoint, decide if can or not access to the application
 *	@param lat
 *	@param long
 *	@return {Promise} A promise with the results data
 */
function allow(lat, long) {
	return new Promise((resolve, reject) => {
		var dist = geolib.getDistance(
		    {latitude: lat, longitude: long},
		    {latitude: 40.412406, longitude: -3.718247}
		);

		const result = {
			allow: false,
			distance: dist
		}

		if (maxDistance === 0 || distance <= maxDistance) {
			result.allow = true;
		}

		resolve(result);
	});
}


module.exports = {
	allow: allow
};
