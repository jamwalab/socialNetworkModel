# Social Network Model
## Version 1.0
## Description
Backend model for a social network app, using NoSql database, where users can register, create thoughts and react to thoughts posted by other users. A user can also add other users as friend.

## Table of Contents
* [License](#license)
* [Installation](#installation)
* [Usage](#usage)
* [Feature](#feature)
* [Credits](#credits)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation
* Clone the repository using the link - `https://github.com/jamwalab/socialNetworkModel.git`
* npm install to add all the required modules.
* npm start to start the app.

## Usage
* [Walkthrough video for this app ](https://www.youtube.com/watch?v=xDx3bzKikrU)
* For the user model a new user can be added using the post request, all users can be displayed or a single user with id using the get request, user data can be edited using put and finally deleted with the delete request.
* User model API are listed below:
  * Get all users and add new user - `/api/users/`.
  * Get one user, edit user and delete user - `/api/users/:userId`.

* A user can add other users as friend and delete them as well.
* Friend API are listed below
  * Add new friend and delete a friend - `/api/users/:userId/friends/:friendId`.
* A user can add thoughts, edit a thought already created ot delete them.
* API to get all thoughts in the database - `/api/thoughts/`.
* To create new thought, id of the user creating it is required. This will automatically pick the username of the user.
* API to create new thought is - `/api/thoughts/:userId`.
* To get a thought by id, edit a thought or delete it, api extention is - `/api/thoughts/:userId/thoughtId`.
* A user can react to thoughts created by other users or their own.
* For reaction API, the id of the user making the reaction is required. The API extention is - `/api/thoughts/:userId/thoughtId`.
* A reaction can also be deleted with API - `/api/thoughts/:userId/thoughtId/reactionId`.

## Feature
* Username for the thoughts and reaction is automatically picked up from the user database.
* When a user is deleted, all their thoughts also get deleted from the database.
* Before deleting thoughs, it checks if the user id provided is correct or not. This makes sure that thought only gets deleted, if its reference in user data is deleted.

## Credits
#### NPM Modules
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)

#### Users
* Abhishek Jamwal - [GitHub](https://github.com/jamwalab)