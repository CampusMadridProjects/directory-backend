/* External dependencies */
// const router = require('express').Router();
const cors = require('cors')({ origin: true });
var jwt = require('jsonwebtoken');

/* Component dependencies */
const Startup = require('./index');

/* Configs */
const Config = require('../../config');

/* Constants */
const secret = Config.jwt.secret || 'secret';

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
		const token = (request.headers.authorization && request.headers.authorization.replace('Bearer ', '')) || '';

		try {
			var decoded = Config.needAuth.startup && jwt.verify(token, secret);
			
			return Startup.list()
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
	getStartups: getStartups
}
