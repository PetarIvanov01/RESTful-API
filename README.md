# Goal API

Welcome to my Node.js Express MongoDB RESTful API learning project repository!

## Table of Contents
- [Overview](#overview)
- [Disclaimer](#disclaimer)
- [Usage](#usage)
  - [User Endpoints](#user-endpoints)
    - [User Login](#user-login)
    - [User Registration](#user-registration)
    - [User Profile Creation](#user-profile-creation)
    - [Get User Profile](#get-user-profile)
    - [Update User Profile](#update-user-profile)
  - [Goals Endpoints](#goals-endpoints)
    - [Get All Goals](#get-all-goals)
    - [Create Goal](#create-goal)
    - [Get Goal by ID](#get-goal-by-id)
    - [Update Goal by ID (Owner Only)](#update-goal-by-id-owner-only)
    - [Delete Goal by ID (Owner Only)](#delete-goal-by-id-owner-only)
- [Authorization](#authorization)
  - [JSON Web Tokens (JWT)](#json-web-tokens-jwt)
  - [Middleware for Authorization](#middleware-for-authorization)
- [Installation](#installation)
- [Testing](#testing)
- [License](#license)

## Overview
This project is a part of my journey to improve my skills in building RESTful APIs using Node.js, Express, and MongoDB. The primary purposes of this API project are:

1. **Self-Improvement:** Building and maintaining this RESTful API is a learning experience for me. It allows me to enhance my knowledge and skills in back-end development.

2. **Web Application Development:** I plan to use this API as the backend for a web application, likely built with React or other frontend technologies. It serves as the foundation for future web development projects.

3. **Future Use:** By developing and documenting this RESTful API, I create a reusable resource for future projects. It can save time and effort when I need to implement similar functionality in other applications.

Feel free to explore the API, contribute to its development, or use it as a reference for your own projects. Your feedback and contributions are highly appreciated.

## Disclaimer
This REST API is primarily developed for learning purposes. It may not adhere to all industry best practices, and there could be areas that need improvement. If you intend to use it I strongly recommend it to be only for educational purposes.


## Usage

### User Endpoints

#### User Login

- **Endpoint:** `/api/user/login`
- **HTTP Method:** POST
- **Request Example:**
  ```http
  POST /api/user/login
  Content-Type: application/json

  {
    "_id": "64fa06e4989b5026f8bce1d8",
    "email": "test@test.bg",
    "token": "token"
  }

- **Endpoint:** `/api/user/register`
- **HTTP Method:** POST
- **Request Example:**
    ```http 
    POST /api/user/register
    Content-Type: application/json
    {
    "_id": "64fa06e4989b5026f8bce1d8",
    "email": "test@test.bg",
    "token": "token"
    }

#### User Profile Creation

- **Endpoint:** `/api/user/profile`
- **HTTP Method:** POST
- **Request Example:**
    ```http 
    POST /api/user/register
    Content-Type: application/json
    Authorization: token
    {
      "userId": "64fa06e4989b5026f8bce1d8",
      "username": "test",
      "avatarImg": "test",
      "category": "test",
      "about": "about",
      "goals": [],
      "_id": "64f5b8ea66c6d563829cdc6f",
      "createdAt": "2023-09-04T11:00:58.307Z",
      "updatedAt": "2023-09-04T11:00:58.307Z",
      "__v": 0
    }

#### Get User Profile

- **Endpoint:** `/api/user/profile/:userId`
- **HTTP Method:** GET
- **Response Example:**
    ```http 
    {
     "username": "test",
     "avatarImg": "test",
     "category": "test",
     "about": "about",
     "goals": []
    }

#### Update User Profile 

- **Endpoint:** `/api/user/profile/:userId`
- **HTTP Method:** PUT
- **Request Example:**
    ```http 
    POST /api/user/register
    Content-Type: application/json
    Authorization: token
    {
     "title": "Updated Goal Title",
     "description": "Updated Goal Description"
    }
- **Response Example:**
    ```http 
    {
     "_id": "64f5b8ea66c6d563829cdc6f",
     "userId": "64f5b795b34387b05d530bd5",
     "username": "test1",
     "avatarImg": "test",
     "category": "test",
     "about": "about",
     "goals": [
         "64f5ba60ce63faa033b54bfc"
     ],
     "createdAt": "2023-09-04T11:00:58.307Z",
     "updatedAt": "2023-09-04T11:34:47.765Z",
     "__v": 1
    }

### Goals Endpoints

#### Get All Goals 

- **Endpoint:** /api/goals
- **HTTP Method:** GET
- **Response Example:**
    ```http
    {
        "message": "Method is Get",
        "items": {
            "results": [
            {
                "_id": "64f432cc8asdccc67e57de82dc",
                "userId": "64f432sdbb8accc67e57de82d9",
                "username": "TEst",
                "avatarImg": "/imgs/test",
                "category": "career",
                "about": "Lorem ipsum dolor sit, amet consectu.",
                "goals": [],
                "createdAt": "2023-09-03T07:16:28.686Z",
                "updatedAt": "2023-09-03T07:16:28.686Z",
                "__v": 0
            }
            ]
        }
    }

#### Create Goal 

- **Endpoint:** /api/goals
- **HTTP Method:** POST
- **Request Example:**
    ```http
    Content-Type: application/json
    Authorization: token
    {
      "title": "Test",
      "description": "Lorem Impsum",
      "image": "TEst img",
      "owner": "64f5b795b34387b05d530bd5",
      "_id": "64f5ba60ce63faa033b54bfc",
      "createdAt": "2023-09-04T11:07:12.008Z",
      "updatedAt": "2023-09-04T11:07:12.008Z",
      "__v": 0
    }

#### Get Goal by ID

- **Endpoint:** /api/goals/:id
- **HTTP Method:** GET
- **Request Example:**
    ```http
    Authorization: token
- **Response Example:**
    ```http
    {
       "message": "Method is Get",
       "items": {
        "_id": "64f432138accc67e57de81d4",
        "title": "TEst",
        "description": "TEST",
        "image": "TEST",
        "owner": "64f306e4989b5016f8fce5d8",
        "createdAt": "2023-09-03T07:13:23.590Z",
        "updatedAt": "2023-09-03T07:13:23.590Z",
        "__v": 0
       }
     }

#### Update Goal by ID (Owner Only)

- **Endpoint:** /api/goals/:id
- **HTTP Method:** PUT
- **Request Example:**
    ```http
    Content-Type: application/json
    Authorization: token
    {
     "title": "Updated Goal Title",
     "description": "Updated Goal Description"
    }

#### Delete Goal by ID (Owner Only)

- **Endpoint:** /api/goals/:id
- **HTTP Method:** DELETE
- **Request Example:**
    ```http
    Authorization: token


## Authorization

### JSON Web Tokens (JWT)

This API uses JSON Web Tokens (JWT) for user authentication and authorization. Here's how it works:

- When a user registers or logs in successfully, they receive a JWT token.
- This token should be included in the `Authorization` header of their subsequent requests to protected routes.
- The API uses a middleware to verify and decode the JWT token to determine the user's identity and authorization level.

### Middleware for Authorization

To ensure that certain routes are accessible only to authenticated users, this API employs a middleware called `authorization`. Here's how it works:

1. **Token Extraction:** When a user makes a request to a protected route, the client should include the JWT token in the `Authorization` header of the request.

2. **Token Verification:** The `authorization` middleware intercepts the request and extracts the token from the `Authorization` header.

3. **Token Decoding:** It then verifies the token's validity using the `verifyToken` function, which checks if the token is valid and not expired.

4. **User Identification:** If the token is valid, the middleware decodes it to extract user information, such as the user's ID and email. This information is attached to the request object (`req.user`) for further processing in the route handler.

5. **Access Granted:** If the token is valid and the user is authenticated, the middleware allows the request to proceed to the route handler. The route can then access the user's information from `req.user` and perform actions based on the user's identity.

6. **Access Denied:** If the token is invalid, expired, or missing, the middleware throws an error, indicating that the user is not authorized to access the protected route.

Remember to include the JWT token in the `Authorization` header of your requests to protected routes to ensure successful authentication and access.

## Installation

Follow these steps to set up and run the Node.js Express MongoDB RESTful API on your local machine:

### Requirements

Before you begin, ensure you have the following software and tools installed:

- `Node.js`: Ensure you have Node.js installed. You can download it from the official website.
- `MongoDB`: MongoDB is the database used by this API. Download and install the MongoDB Community Edition on your machine.

### Clone the Repository

1. Clone this repository to your local machine using your preferred method (HTTPS or SSH)

2. Navigate to the project's root directory

### Install Dependencies

1. Install the project dependencies using npm

2. Create a .env file based and use this example: 
    ```
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/RestApi
    JWT_SECRET=dsadsad1221dasd

### Start the Server

 The server will start, and you'll see a message indicating that it's running, typically on port 5000 `(http://localhost:5000)`.


### Test
 Now that the API is running locally with MongoDB and your environment variables configured, you can use tools like `Postman` to make requests to the API endpoints. Refer to the "Usage" section of this README for details on available endpoints and their expected responses.

## License

This project is licensed under the MIT License.

