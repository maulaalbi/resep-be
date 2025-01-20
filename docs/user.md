# User API Spec

## REGISTER User API

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "albi",
    "password" : "doang",
    "name" : "Muhammad Maula Albi Badalawa"
}
```

Response Body Success:
```json
{   "data" : {
        "username" : "albi",
        "name" : "Muhammad Maula Albi Badalawa"
    }
    
}
```

Response Body Error:
```json
{
    "errors" : "username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body : 
```json
{
    "username" : "albi",
    "password" : "doang",
}
```

Response Body Success : 
```json
{   "data" : {
        "token" : "unique-token"
    }
    
}
```

Response Body Error:
```json
{
    "errors" : "username or password wrong"
}
```


## Update User API

Endpoint : PATCH /api/users/current

Headers : 
- Authorization : token

Request Body : 
```json
    {
        "name" : "Muhammad Maula Albi Badalawa", //optional
        "password" : "new-password" //optional
    }
```

Response Body Success:
```json
{  
     "data" : {
        "username" : "albi",
        "name" : "Muhammad Maula Albi Badalawa"
    }
    
}
```

Response Body Error : 
```json
{
    "errors" : "name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data" :{
        "username" : "albi",
        "name" : "Muhammad Maula Albi Badalawa"
    }
}
```

Response Body Error : 
```json
{
    "errors": "Unauthorized"
}
```x

## Logout User API

Endpoint : DELETE /api/users/logout

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data" : "OK"
}
```

Response Body Error : 
```json
{
    "errors": "Unauthorized"
}
```