
# Interview_assessment_task

## Coding Round Assessment Task: Backend Developer

### Task: REST API Development with Node.js and MongoDB
Objective:

Develop a simple RESTful API for a task management system. The API should support
CRUD operations for tasks and include basic authentication. The main focus is on
problem-solving, designing the solution, and code quality.
Requirements:
1. User Authentication:
- Implement user registration and login.
- Use JWT (JSON Web Token) for securing the API endpoints.
- Endpoints:
- POST /auth/register - Register a new user.
- POST /auth/login - Authenticate a user and return a JWT.

2. Task Management:
- Implement CRUD operations for tasks.
- Each task should have the following fields:
- title (string, required)
- description (string, optional)
- status (string, required, default: "pending")
- dueDate (date, optional)
- Only authenticated users should be able to access these endpoints.
- Endpoints:
- GET /tasks - Retrieve all tasks for the authenticated user.
- POST /tasks - Create a new task.
- GET /tasks/:id - Retrieve a specific task by ID.
- PUT /tasks/:id - Update a task by ID.
- DELETE /tasks/:id - Delete a task by ID.

3. Data Storage:
- Use MongoDB to store user and task data.


# Project Setup Instruction
- Install (nodemon package) in your system globally.

        npm install nodemon
    
- Choose your directory, where you have to pull the project 

        cd your-destination-folder

- Clone project

        git clone https://github.com/Riteshagg/interview_assessment_task.git
    
- Install all dependencies with below command

        npm install
    
- Start Server with below command

        npm run start
    
- Import API collection into the postman.

        interview-test.postman_collection.json

- Change DB Connection URL in the .env file as per your requirement.

        DB_URL: mongodb://localhost:27017/interviewTest

    
