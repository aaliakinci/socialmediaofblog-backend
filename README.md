# socialblogApi

### Api Kullanımı

# User

| Route              | Http Verb | Req Body                                                |
| ------------------ | --------- | ------------------------------------------------------- |
| url/users/register | post      | name,surname,username,password,phoneNumber,email,gender |
| url/users/login    | post      | username,password                                       |

# Article

| Route               | Http Verb | Req Body                                   | Description    |
| ------------------- | --------- | ------------------------------------------ | -------------- |
| url/articles        | get       |                                            | Get All        |
| url/articles/create | post      | title,description,content,user_id,hashtags | Create Article |
