export class User {
  constructor(id = 0, username = "", password = "") {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  validate(username, password) {
    let errorMessage = {};
    if (username === "") {
      errorMessage.username = "O campo usuário é obrigatório";
    }
    if (password === "") {
      errorMessage.password = "O campo senha é obrigatório";
    }
    if (Object.keys(errorMessage).length > 0) {
      //formRef.current.setErrors(errorMessage);
      throw errorMessage;
    }
  }
}
