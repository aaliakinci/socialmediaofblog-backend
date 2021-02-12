### Restful api routes

# User

| Route                 | Http Verb | Req Body                                                | Description                                           |
| --------------------- | --------- | ------------------------------------------------------- | ----------------------------------------------------- |
| url/users/register    | post      | name,surname,username,password,phoneNumber,email,gender | Register User                                         |
| url/users/login       | post      | username,password                                       | Login User turn Token                                 |
| url/users/follow      | post      | user_id_a,user_id_b                                     | Follow user a to b                                    |
| url/users/unFollow    | post      | user_id_a,user_id_b                                     | unFollow user a to b                                  |
| url/users/:user_id    | put       | name,surname,username,password,phoneNumber,email,gender | Update user by user_id if user_id===header.token.\_id |
| url/users/banUser     | post      | user_id                                                 | ban user                                              |
| url/users/unBanUser   | post      | user_id                                                 | unBan user                                            |
| url/users/userToAdmin | post      | user_id                                                 | upgrade user to admin                                 |
| url/users/adminTouser | post      | user_id                                                 | admin to user                                         |
| url/users/:username   | get       |                                                         | get user by username                                  |

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

| Route                   | Http Verb | Req Body                   | Description                    |
| ----------------------- | --------- | -------------------------- | ------------------------------ |
| url/likes/user/:user_id | get       |                            | Get Articles By User Likes     |
| url/likes/:article_id   | get       |                            | Get Likes By article_id        |
| url/likes/create        | post      | user_id,article_id         | Create Comment                 |
| url/likes/delete        | post      | user_id,article_id,like_id | Delete Comment                 |
| url/likes/isLike        | post      | user_id,article_id         | user_id is like this article ? |

# Hashtag

| Route                    | Http Verb | Req Body | Description                |
| ------------------------ | --------- | -------- | -------------------------- |
| url/hashtags/create      | post      | body     | Create Hashtag             |
| url/hashtags/:hashtag_id | get       |          | Get Articles By Hashtag_id |
| url/hashtags/            | get       | body     | Get All Hashtags           |
