const geolib = require('geolib');


/** allow
 *	???
 *	@param lat
 *	@param long
 *	@return {Promise} A promise with the people list
 */
function allow(lat, long) {
	return new Promise((resolve, reject) => {
		var dist = geolib.getDistance(
		    {latitude: lat, longitude: long},
		    {latitude: 40.412406, longitude: -3.718247}
		);

		resolve({
			allow: true,
			distance: dist
		});
	});
}


module.exports = {
	allow: allow
};
