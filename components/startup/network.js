/* External dependencies */
// const router = require('express').Router();
const cors = require('cors')({ origin: true });

/* Component dependencies */
const Startup = require('./index');


/* Routes */
// router.get('/', getStartups);


/* Functions */

/** getStartups
 *	[HTTP] Get a startup list
 *
 *	@param request {Object} Express request
 *	@param response {Object} Express reponse
 *	@return {void}
 */
function getStartups(request, response, next) { 
	cors(request, response, () => {
		return Startup.list()
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
	getStartups: getStartups
}
