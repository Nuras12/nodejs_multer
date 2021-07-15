Commands to start the project:
  1. docker-compose build
  2. docker-compose up -d

Create user:
  - curl -X POST -H "Content-type: application/json" -d '{"username": "user112", "password":"pass1" }' http://localhost:8080/auth/register

Get a token: 
  - curl -X POST -H "Content-type: application/json" -d '{"username": "user1", "password":"pass1" }' http://localhost:8080/auth/login

Log out:
  - curl -X GET -H "Content-type: application/json" http://localhost:8080/auth/logout


Get pictures list:
    # you can pass the token either as a `token` variable in a cookie, or as a` x-access-token` header
  - curl -H 'x-access-token: your_token' 'http://localhost:8080/pictures'

Get picture by id:
  - curl -H 'x-access-token: your_token' 'http://localhost:8080/pictures/PICTURE_ID'

Put pictures:
  - curl -X POST -H 'x-access-token: your_token' -F "foo[]=@path_to.jpeg" -F "foo[]=@path_to.jpeg" http://localhost:8080/pictures