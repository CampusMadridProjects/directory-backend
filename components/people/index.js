const Store = require('./store');


/** getPeople
 *	List all the persons in people collection
 *	@return {Promise} A promise with the people list
 */
function getPeople() {
	return Store.list();
}

/** getPerson
 *	@param {String} id
 */
function getPerson(id) {
	return Store.get(id);
	// return { _id: id };
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
	return Store.upsert(person);
}

/** updatePeopleData
 *
 *	@param db {Array} An array of persons to update
 *
 *	@return {Promise}
 */
function updatePeopleData(db) {
	// check if array
	if (!Array.isArray(db)) {
		// Why db is not an array?
		const err = 'Database is not an array!';
		console.error(err, typeof db, db);
		return Promise.reject(err);
	}

	var peopleToAdd = [];

	for (var i = db.length - 1; i >= 0; i--) {
		// TODO(CodingCarlos): Might we use modelate?
		const person = modelate(db[i]);

		// Add person to db
		peopleToAdd.push(Store.upsert(person));
	}

	console.log('Ready to add ' + peopleToAdd.length + ' results.');

	// Execute adding, and wait for finishing to answer
	return Promise.all(peopleToAdd);
}

function modelate(person) {
	var data = {
		"_id": person.user_id || null,
		"active": (person.active === true),
		"twitter": person.user_twitterUrl || '',
		"name": person.user_name || '',
		"linkedin": person.user_linkedinUrl || '',
		"role": person.job_title || '',
		"pic": person.user_picture || '',	// If default pic, set it here ^^
		"expertise": person.user_expertise.replace(/\s/g,'').split(',') || [],
		"company": person.user_company || '',
		"company_id": person.user_companyLink || '',
		"location": person.location || '',
		"status": 'offline'	// db.user_status || 'offline'
	};

	return data;
}


module.exports = {
	list: getPeople,
	get: getPerson,
	upsert: upsertPerson,
	updatePeopleData: updatePeopleData
};
