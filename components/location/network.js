/* External dependencies */
// const router = require('express').Router();
const cors = require('cors')({ origin: true });

/* Component dependencies */
const Location = require('./index');


/* Routes */
// router.get('/', accessByLocation);


/* Functions */

/** accessByLocation
 *	[HTTP] Given a location, return a token or not
 *
 *	@param request {Object} Express request
 *	@param response {Object} Express reponse
 *	@return {void}
 */
function accessByLocation(request, response, next) { 
	cors(request, response, () => {
		const lat = request.query.lat;
		const long = request.query.long;

		return Location.allow(lat, long)
			.then( (data) => {
				return response.send(data);
			})
			.catch(e => {
				console.error('error', e)
				response.status(401).send({allow: false});
			});
	});
}


/* Exposed interface */

module.exports = {
	accessByLocation: accessByLocation
}
