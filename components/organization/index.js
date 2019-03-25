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

/** updateOrgData
 *
 *	@param db {Array} An array of organizations to update
 *
 *	@return {Promise}
 */
function updateOrgData(db) {
	// return Promise.resolve('Not done yet... Resolving to avoid exceptions.');

	// check if array
	if (!Array.isArray(db)) {
		// Why db is not an array?
		const err = 'Database is not an array!';
		console.error(err, typeof db, db);
		return Promise.reject(err);
	}

	var organizationsToAdd = [];

	for (var i = db.length - 1; i >= 0; i--) {
		// TODO(CodingCarlos): Might we use modelate?
		const organization = modelate(db[i]);

		// Add organization to db
		organizationsToAdd.push(upsertStartup(organization));
	}

	console.log('Ready to add ' + organizationsToAdd.length + ' results.');

	// Execute adding, and wait for finishing to answer
	return Promise.all(organizationsToAdd);
}

/** [internal] modelate
 *	@param {object} organization Organization to modelate data
 *	@return {object} A valid organization structure
 */
function modelate(organization) {
	var data = {
		"_id": organization.org_id || null,
		"active": (organization.active === true),
		"description": organization.org_description || '',
		"employee_count": organization.org_employeesNumber || '',
		"employees": ( organization.org_employeesLinks && organization.org_employeesLinks.replace(/\s/g,'').split(',').map( personId => { 
			return 'people/' + personId 
		}) ) || [],
		"logo": organization.org_picture || '',	// If default pic, set it here ^^
		"name": organization.org_name || '',
		"profile": ( organization.org_profile && organization.org_profile.replace(/\s/g,'').split(',') ) || [],
		"target": organization.org_target || '',
		"twitter": organization.org_twitterUrl || '',
		"website": organization.org_websiteUrl || ''
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
			employeeList.push( People.get(startup.employees[i].split('/')[1]) )
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
	updateOrgData: updateOrgData
};
