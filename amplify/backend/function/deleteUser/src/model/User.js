/* we used the class name UserInfo rather user because user is a reserved name in postgres */
class User {
  constructor(firstname, lastname, email, id = undefined) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.id = id;
  }
}
module.exports = { User: User };
