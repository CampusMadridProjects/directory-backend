/* External dependencies */
// const router = require('express').Router();
const cors = require('cors')({ origin: true });

/* Component dependencies */
const Org = require('./index');


/* Routes */
// router.get('/', getOrganizations);


/* Functions */

/** getOrganizations
 *	[HTTP] Get an organizations list
 *
 *	@param request {Object} Express request
 *	@param response {Object} Express reponse
 *	@return {void}
 */
function getOrganizations(request, response, next) { 
	cors(request, response, () => {
		return Org.list()
			.then( (data) => {
				return response.send(data);
			})
			.catch(e => {
				console.error('error', e)
				response.status(500).send([]);
			});
	});
}


/* Exposed interface */

module.exports = {
	getOrganizations: getOrganizations
}
