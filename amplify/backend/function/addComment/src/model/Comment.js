class Comment {
  constructor(
    user,
    post,
    content,
    date,
    responseToComment = undefined,
    id = undefined
  ) {
    this.user = user;
    this.post = post;
    this.content = content;
    this.date = date;
    this.id = id;
    this.responseToComment = responseToComment;
  }
}
module.exports = { Comment: Comment };
