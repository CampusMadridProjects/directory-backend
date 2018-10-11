/* Modules */
const geolib = require('geolib');

/* Configs */
const Config = require('../../config');

/* Constants */
const maxDistance = Config.location.maxDistance;
const secret = Config.jwt.secret || 'secret';


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
			distance: distance,
			token: null,
		};

		// console.log('Detected distance: ' + distance)
		// console.log('Maximum allowed distance: ' + maxDistance)

		if (maxDistance === 0 || distance <= maxDistance) {
			result.allow = true;
		} else {
			console.warn('Trying to access ' + distance + ' meters away from Campus.');
		}

		result.token = generateJWT(distance);

		resolve(result);
	});
}


function generateJWT(distance) {
	var data = {
		distance: distance,
		date: new Date(),
	}

	return jwt.sign(data, secret)


module.exports = {
	allow: allow
};
