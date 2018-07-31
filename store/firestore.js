/* External dependencies */
const Firestore = require('@google-cloud/firestore');


/* Configuration */
const firestore = new Firestore({
	projectId: 'campus-directory-beta',
	keyFilename: './serviceAccount.json',
});


/* Internal functions */

/**	upsert
 *	Insert or replace a person in 'people' collection
 *
 *	USE WITH CAUTION! 
 *	This function uses 'set' instad of 'update', so you need to
 *	provide full entitiy to avoid loosing data!
 *
 *	@param collection {String} Collection name to upsert in
 *	@param data {Object} The data you want to upsert
 *
 *	@return {Promise} A promise with the upsert result
 */
function upsert(collection, data) {
	if (!data) {
		const err = 'Unable to update: No data came';
		// throw new Error(err);
		return Promise.reject(err);
	} else if (!collection) {
		const err = 'Unable to update: Collection did not came';
		// throw new Error(err);
		return Promise.reject(err);
	}

	const id = data._id || generate(alphabet, 20); // => "BCiWBgfaeCf0j7griRp0"

	document = firestore.doc(collection + '/' + id);
	return document.set(data);
}

/** get
 *	Get a document data given a firestore collection and id.
 *
 *	@param collection {String} Collection name where the document is in
 *	@param id {String} Id of the document to get
 *
 *	@return {Promise} A promise with the full person data
 */
function get(collection, id) {
	const ref = firestore.doc(collection + '/' + id);
	return getByRef(ref);
}

/** [internal] getByRef
 *	Get a document data given a firestore collection and id.
 *
 *	@param ref {DocumentReference} Firebase's document reference
 *
 *	@return {Promise} A promise with the full person data
 */
function getByRef(ref) {
	return ref.get()
		.then(d => { 
			return d.data();
		})
		.then((data) => {
			return cleanData(data);
		})
		.catch(e => {
			console.error('Error getting people data:', e);
			return null;
		});
}

/** list
 *	List all the documents in people collection
 *	@return {Promise} A promise with the people list
 */
function list(collection) {
	let query = firestore.collection(collection);
	return query.get().then(getListData);
}

/** [internal] getListData
 *	For a list of people references, get the data of all of them
 *	@param {object} querySnapshot A list of references
 *	@return {Promise} A promise with a people list as a param
 */
function getListData(querySnapshot) {
	const documents = [];

	querySnapshot.forEach(documentSnapshot => {
		// For each reference, prepare the promise to get the document
		let documentRef = firestore.doc(documentSnapshot.ref.path);
		documents.push(getByRef(documentRef));
	});
	
	// And get all the documents in one shot
	return Promise.all(documents)
}

/** [internal] cleanData
 *	
 *	@prop {object} data
 *	@return {object}
 */
function cleanData(data) {
	for(let prop in data) {
		if (data[prop] instanceof Firestore.DocumentReference) {
			data[prop] = data[prop].path;
		} else if ( Array.isArray(data[prop])) {
			data[prop] = cleanData(data[prop]);
		}
	}

	return data;
}


/* Exposed interface */

module.exports = {
	upsert: upsert,
	get: get,
	list: list
};