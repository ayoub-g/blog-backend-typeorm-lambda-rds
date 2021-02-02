class Post {
  constructor(user, content, date, id = undefined) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.date = date;
  }
}
module.exports = { Post: Post };
