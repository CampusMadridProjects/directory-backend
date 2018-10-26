module.exports = {
	alphabet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	firebase: {
		projectId: 'firebase-project-id',
		keyFilename: './serviceAccount.json',
	},
	storage: {
		writerName: 'backend',
		userDbFile: 'user-db.json',
		startupDbFile: 'company-db.json',
		orgDbFile: 'org-db.json'
	},
	location: {
		latitude: 40.412406,
		longitude: -3.718247,
		maxDistance: 0,
	}
}