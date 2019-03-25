const persistent = require('../../store/firestore');

const COLLECTION = 'people';


/* Internal functions */

/** getPeople
 *	List all the persons in people collection
 *	@return {Promise} A promise with the people list
 */
function getPeople() {
	return persistent.list(COLLECTION)
		.then(data => {
			return data.filter(item => item.active === true);
		});
}

/** getPerson
 *	Get a person given its id
 *	@param {string} id Id of the person to get
 *	@return {Promise} A promise with the person as data
 */
function getPerson(id) {
	return persistent.get(COLLECTION, id);
}

/**	upsertPerson
 *	Insert or replace a startup in 'startup' collection
 *
 *	USE WITH CAUTION! 
 *	This function uses 'set' instad of 'update', so you need to
 *	provide full entitiy to avoid loosing data!
 *
 *	@param person {Object} The object you want to upsert
 *	@return {Promise} A promise with the upsert result
 */
function upsertPerson(person) {
	return persistent.upsert(COLLECTION, person);
}

/* Exported interface */

module.exports = {
	list: getPeople,
	get: getPerson,
	upsert: upsertPerson
}
