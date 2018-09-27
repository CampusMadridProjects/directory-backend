const Store = require('./store');

const People = require('../people');


/** getStartups
 *	List all the startups in startups collection
 *	@return {Promise} A promise with the people list
 */
function getStartups() {
	return Store.list()
		.then( (data) => {
			const startupList = [];

			for (var i = 0; i < data.length; i++) {
				startupList.push(getEmployees(data[i]))
			}

			return Promise.all(startupList);
		})
		.catch( (e) => {
			const err = 'Error getting startup list';
			console.error(err)
			return Promise.reject(err);
		});
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
	return Store.upsert(startup);
}

/** updateStartupData
 *
 *	@param db {Array} An array of startups to update
 *
 *	@return {Promise}
 */
function updateStartupData(db) {
	// return Promise.resolve('Not done yet... Resolving to avoid exceptions.');

	// check if array
	if (!Array.isArray(db)) {
		// Why db is not an array?
		const err = 'Database is not an array!';
		console.error(err, typeof db, db);
		return Promise.reject(err);
	}

	var startupsToAdd = [];

	for (var i = db.length - 1; i >= 0; i--) {
		// TODO(CodingCarlos): Might we use modelate?
		const startup = modelate(db[i]);

		// Add startup to db
		startupsToAdd.push(upsertStartup(startup));
	}

	console.log('Ready to add ' + startupsToAdd.length + ' results.');

	// Execute adding, and wait for finishing to answer
	return Promise.all(startupsToAdd);
}

/** [internal] modelate
 *	@param {object} startup Startup to modelate data
 *	@return {object} A valid startup structure
 */
function modelate(startup) {
	var data = {
		"_id": startup.company_id || null,
		"accelerator": startup.accelerator || '',
		"accelerator_logo": startup.accelerator_logo || '',
		"active": startup.active || '',
		"description": startup.company_description || '',
		"employee_count": startup.company_employeesNumber || '',
		"employees": startup.company_employeesLinks.replace(/\s/g,'').split(',').map( personId => { 
			return 'people/' + personId 
		}) || [],
		"logo": startup.company_picture || '',	// If default pic, set it here ^^
		"name": startup.company_name || '',
		"profile": startup.company_profile.replace(/\s/g,'').split(',') || [],
		"target": startup.company_target || '',
		"twitter": startup.company_twitterUrl || '',
		"website": startup.company_websiteUrl || ''
	};

	return data;
}

/** [internal] getEmployees
 *	Complete a startup with its employees data.
 *	@param {object} startup A startup to get employees
 *	@return The startup complete with the full employee list
 */
function getEmployees(startup) {
	const employeeList = [];

	if (startup.employees && Array.isArray(startup.employees)) {
		for (var i = 0; i < startup.employees.length; i++) {
			try {
				employeeList.push( People.get(startup.employees[i].split('/')[1]) )
			} catch (e) {
				console.error('Error getting person data:');
				console.error(e);
			}
		}
	} 

	return Promise.all(employeeList)
		.then((employees) => {
			startup.employees = employees;
			return startup;
		})
		.catch(e => {
			const err = 'Unable to get employee list';
			console.error(err, e);
			return Promise.reject(err, e);
		});
}

module.exports = {
	list: getStartups,
	upsert: upsertStartup,
	updateStartupData: updateStartupData
};
