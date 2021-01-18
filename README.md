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
| url/comments/delete      | post      | user_id,article_id,comment_id  | Delete Comment            |

# Like

| Route              | Http Verb | Req Body                   | Description                |
| ------------------ | --------- | -------------------------- | -------------------------- |
| url/likes/:user_id | get       |                            | Get Articles By User Likes |
| url/likes/create   | post      | user_id,article_id         | Create Comment             |
| url/likes/delete   | post      | user_id,article_id,like_id | Delete Comment             |

# Hashtag

| Route                    | Http Verb | Req Body | Description                |
| ------------------------ | --------- | -------- | -------------------------- |
| url/hashtags/create      | post      | body     | Create Hashtag             |
| url/hashtags/:hashtag_id | get       |          | Get Articles By Hashtag_id |
