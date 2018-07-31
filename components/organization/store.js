const persistent = require('../../store/firestore');

const COLLECTION = 'organization';


/* Internal functions */

/** getStartups
 *	List all the startups in startup collection
 *	@return {Promise} A promise with the startup list
 */
function getStartups() {
	return persistent.list(COLLECTION);
}

/** getStartup
 *	Get a startup given its id
 *	@param {string} id Id of the startup to get
 *	@return {Promise} A promise with the startup as data
 */
function getStartup(id) {
	return persistent.get(COLLECTION, id);
}

/**	upsertStartup
 *	Insert or replace a startup in 'startup' collection
 *
 *	USE WITH CAUTION! 
 *	This function uses 'set' instad of 'update', so you need to
 *	provide full entitiy to avoid loosing data!
 *
 *	@param startup {Object} The object you want to upsert
 *	@return {Promise} A promise with the upsert result
 */
function upsertStartup(startup) {
	return persistent.upsert(COLLECTION, startup);
}

/* Exported interface */

module.exports = {
	list: getStartups,
	get: getStartup,
	upsert: upsertStartup
}
