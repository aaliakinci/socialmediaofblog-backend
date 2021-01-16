### Restful api routes

# User

| Route              | Http Verb | Req Body                                                | Description           |
| ------------------ | --------- | ------------------------------------------------------- | --------------------- |
| url/users/register | post      | name,surname,username,password,phoneNumber,email,gender | Register User         |
| url/users/login    | post      | username,password                                       | Login User turn Token |
| url/users/follow   | post      | user_id_a,user_id_b                                     | Follow user a to b    |
| url/users/follow   | post      | user_id_a,user_id_b                                     | unFollow user a to b  |

# Article

| Route                        | Http Verb | Req Body                                   | Description                                                  |
| ---------------------------- | --------- | ------------------------------------------ | ------------------------------------------------------------ |
| url/articles                 | get       |                                            | Get All                                                      |
| url/articles/create          | post      | title,description,content,user_id,hashtags | Create Article                                               |
| url/articles/reactionPoint   | get       |                                            | Get All Article with User Sort By ReactionPoint and CreateAt |
| url/articles/byUser/:user_id | get       |                                            | get Articles by User Id                                      |
| url/articles/:article_id     | get       |                                            | get Article by Article Id                                    |
| url/articles/followsArticle  | get       |                                            | get FollowsArticle                                           |





# Comment

| Route                    | Http Verb | Req Body                       | Description               |
| ------------------------ | --------- | ------------------------------ | ------------------------- |
| url/comments/:article_id | get       |                                | Get Comments by ArticleId |
| url/comments/create      | post      | user_id,article_id,description | Create Comment            |
