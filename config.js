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
		maxDistance: 0,
	}
}