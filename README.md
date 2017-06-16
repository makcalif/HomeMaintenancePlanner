# Home Maintenance Planner

A sample web application to create Planning Tasks. There are only two fields for a planning task: title and date
Used react-datepicker to allow selecting task date

## Why use React JS for frontend?

React JS supports componentization. It also supports pure components that offer better testability. React JS with Redux makes code more maintainable and easy to understand. React JS has good performance and good for SEO also. You can even write code that can be easily ported to a native mobile app using React JS.

## Why use Express/Node JS for backend api?

It is extremely efficient as it remove lot of boiler plate code for writing rest APIs. It supports routers for refactoring APIs. It's good for error handling.

## Completed 

* A single page to create new tasks using React JS
* View, Add and Delete planner items implemented on single page as it makes sense to have those all handy
* Implemented CSS colors to distinguish upcoming items from past items
* Backend CRUD API using Node JS and Express server with router for adding and deleting a planning task
* Implemented Backend using Sequelize ORM with SQLite
* Test cases to create data in database and through API
* Test cases to verify the data created above via API

## Important files

React JS:
	Files organized by modules. Here there is only one module 'Tasks' under src/routes/Tasks

Node JS API:
	API server code under server folder. The main node js file is: server.js
	Tasks API refactored under server/routes/tasks

Expect/Chai tests:
	server/test/*.test.js


## Skipped
1. Implement the build command should create `dist/*` assets
2. Configuration to change port to run on ports other than 3000
 
## How to Run
1. Install the project using 'yarn install'
2. Run it using 'yarn start'
3. Access the url : http://localhost:3000
4. Run the test cases using 'yarn test-db'
