# Cloud Functions Backend
Backend for the campus directory app. It uses cloud functions for firebase as entry point.

## What is this?
This is the backend for a web-app to manage people and organizations in a community. This allows members to know each other and find potential connections.

It uses JavaScript (well, NodeJS) to run a component based architecture exposed with Firebase Cloud Functions.

## Status
Currently, we are **actively developing** this. It shall have bugs, since we're right now testing everything, and getting it stable. It seems to be strong, but we need to test it against heavy loads of data. If you plan to use this in a hostile production environment, do it under your own responsibility.

You can follow the development, and propose new features, in this repo's issues ^^

## Tech stack
 - **NodeJS**: Language to build the code. *[TODO: Add code style rules]*
 - **Firestore**: Database to store information. It is closed for read and write, and only a valid service account can interact with it. *[TODO: Add security rules]*
 - **Firebase Storage**: To get information to add in the database. Also, in a future, to store custom images and static files. *It uses [@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage "@google-cloud/storage") library, since both systems are in process to be unified.*
 - **Firebase Cloud Functions**: To expose the API and listen for object bucket changes (to update the database)

## How do the data came?
Now, we're reading data to update from json files. We have 3 files, one for each database entity, stored in Firebase Cloud Storage, and every time a file is updated, a Cloud Function gets invoked, read the file, and update the Firestore database.

You can use whatever you want to update the JSON files (from doing it manually, to having an incredible control panel). That is not responsibility of this repository, so do it as you feel confortable with *(we are using a Google Drive's Spreadsheet and [Google Apps Script](https://developers.google.com/apps-script/ "Google Apps Script"))*

# Setup
To run this, you need a firebase project with cloud functions enabled. Once you've got it, create a folder in your computer, move there and initialize your firebase project in that folder:

```bash
mkdir my-project
cd my-project
firebase init
```

In your project, go to `functions` folder, and clone there the repository:

```bash
cd functions
git clone https://github.com/CampusMadridProjects/cloud-functions-backend.git .
```

Then, install the dependencies, and deploy functions

```bash
npm install
firebase deploy --only functions
```

When it's done, you'll have the URL to your new functions endpoints. You can make sure that everything is working well checking your firebase console.

# Contribute
For any problem you find, feel free to open an issue. If you find something you want to fix, feel free to launch a Pull Request to `develop` branch. Extra points if you link it with the related issue.

The same for new features ^^

# License
MIT
