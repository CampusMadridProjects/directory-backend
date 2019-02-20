/* External dependencies */
// const router = require('express').Router();
const cors = require('cors')({ origin: true });
var jwt = require('jsonwebtoken');

/* Component dependencies */
const People = require('./index');

/* Configs */
const Config = require('../../config');

/* Constants */
const secret = Config.jwt.secret || 'secret';


/* Routes */
// router.get('/', getPeople);


/* Functions */

/** getPeople
 *	[HTTP] Get a people list 
 *
 *	@param request {Object} Express request
 *	@param response {Object} Express reponse
 *	@return {void}
 */
function getPeople(request, response, next) { 
	cors(request, response, () => {
		const token = (request.headers.authorization && request.headers.authorization.replace('Bearer ', '')) || '';

		try {
			var decoded = Config.needAuth.people && jwt.verify(token, secret);
			
			return People.list()
				.then( (data) => {
					return response.send(data);
				})
				.catch(e => {
					console.error('error', e)
					response.status(500).send([]);
				});
		} catch(err) {
			return response.status(401).send([]);
		}
	});
}



/* Exposed interface */

module.exports = {
	getPeople: getPeople
}
