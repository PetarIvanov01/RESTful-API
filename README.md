# Goal API

Welcome to my Node.js Express MongoDB RESTful API learning project repository!

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