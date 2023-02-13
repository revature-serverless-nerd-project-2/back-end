# API DOCUMENTATION FOR VANGUARD ECOMMERCE PROJECT

# START UP
To start the application simply run npm install to install all the necessary node packages and run npm start/ node index.js to start the server.
The server is configured to run on PORT 3000.

# Database
Configure 3 environment variables in AWS on your local computer: AWS_ACCESS_KEY_ID, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY.
Create the Orders, carts, Products and Users table in DynamoBD.


# Endpoints

## Checkout Endpoint
Request
 -HTTP Method 
  - POST 
 -URL 
  - /checkout 
 -Headers 
  - Content-Type: application/json 
  - Authorization : token

## Response Scenarios

1. Item successfully checked out
-Status Code 
  - 201 Created
-Body 
  ```json
{ 
     "message": "Item successfully checked out"
 } 
 ```
-Headers - Content-Type: application/json

2. Items already checked out!
-Status Code 
  - 400 Bad request
-Body 
  ```json
{
    "message": {
        "name": "NoCartItemsToCheckoutError"
    }
}
 ```
-Headers - Content-Type: application/json

## Login Endpoint
Request
 -HTTP Method  
   - POST 
 -URL  
   - /login 
 -Headers 
   - Content-Type: application/json 
 -Body 
   ```json
   { 
    "username" : "user1",
    "password" : "password123"

   }
  ```

## Response Scenarios
1. Successful Login
-Status Code 
  - 200 OK 
-Body 
  ```json
  { 
    "message" : "Welcome back user1 ",
    "token" : "token"
  } 
  ```
-Headers 
  - Content-Type: application/json

2. Invalid username
-Status Code 
  - 400 Bad Request 
-Body 
  ``` json
{ 
  "message" : "Invalid username"

 } 
  ```
-Headers 
  - Content-Type: application/json

3. Invalid password, valid username
-Status Code 
  - 400 Bad Request 
-Body 
  ```json
 { 
    "message": "Invalid password!" 
 } 
  ```
-Headers 
  - Content-Type: application/json

## Register Endpoint
Request
-HTTP Method 
  - POST 
-URL 
  - /register 
-Headers 
  - Content-Type: application/json 
-Body 
  ```json
{
    "username" : "user1",
    "password" : "password123",
    "name" : "Jane Doe",
    "address" : "345 street",
    "role" : "user"
 }
  ```
## Response Scenarios

1. Successful registration
-Status Code 
  - 200 OK 
-Body 
  ```json
{ 
    "message" : "Successful Registration"
 } 
 ```
-Headers - Content-Type: application/json

2. Unsuccessful registration because username is already taken
-Status Code 
  - 400 Bad Request 
-Body 
  ```json
{ 
    "message" : "Username is already"
 } 
  ```
-Headers - Content-Type: application/json


