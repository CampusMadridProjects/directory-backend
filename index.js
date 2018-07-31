const functions = require('firebase-functions');

const people = require('./components/people/network');
const startup = require('./components/startup/network');
const organization = require('./components/organization/network');
const storage = require('./components/storage/network');

// Export Cloud-Functions
exports.getPeople = functions.https.onRequest( people.getPeople );
exports.getStartups = functions.https.onRequest( startup.getStartups );
exports.getOrganizations = functions.https.onRequest( organization.getOrganizations );	

exports.updateData = functions.storage.object().onFinalize( storage.updateData );
