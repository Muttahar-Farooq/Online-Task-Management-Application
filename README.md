# Online Task Management Application

This repository contains the source code for an Online Task Management Application, built using the MERN (MongoDB, Express.js, React.js, and Node.js) stack. The application allows users to create, manage, and track tasks and projects.

## Table of Contents
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#usage)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

## Features
* User authentication and authorization
* Group creation and management
* Task creation, assignment, and tracking
* Responsive user interface

## Requirements
* Node.js v14.x.x or higher
* MongoDB v4.x.x or higher
* npm v6.x.x or higher

## Installation
1. Clone the repository to your local machine:
```cmd
git clone https://github.com/Muttahar-Farooq/Online-Task-Management-Application.git
```
2. Change to the repository directory:
```cmd
cd Online-Task-Management-Application
```
3. Install the server dependencies:
```cmd
cd server
npm install
```
4. Install the client dependencies:
```cmd
cd ../client
npm install
```
5. Create a `.env` file in the `server` directory with the following environment variables (Replace `<>` with the correct strings):
```
MONGODB_USER=<your_mongodb_username>
MONGODB_PASSWORD=<your_mongodb_password>
MONGODB_CLUSTER=<your_mongodb_clustur_url>
ACCESS_TOKEN_SECRET=<any_secrect_key_for_jwt>
```
## Usage
1. Start the server:
```cmd
cd server
npm start
```
The server will run on `http://localhost:5000`.

2. In a new terminal, start the client:
```cmd
cd client
npm start
```
The client will run on `http://localhost:3000`.

3. Open your browser and navigate to `http://localhost:3000` to use the Online Task Management Application.

## Contributing
1. Fork the repository on GitHub.
1. Clone the forked repository to your local machine.
1. Create a new branch for your feature or bugfix.
1. Make your changes and commit them to your branch.
1. Push your changes to your fork on GitHub.
1. Create a pull request from your fork to the original repository.

## License
This project is licensed under the MIT [License](/LICENSE). See the LICENSE file for details.
