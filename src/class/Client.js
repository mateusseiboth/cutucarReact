export class Client {
  constructor(id = 0, nome = "", cpf = "", telefone = "") {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
  }
  validate(nome, cpf, telefone) {
    let errorMessage = {};
    if (nome === "") {
      errorMessage.nome = "O campo nome é obrigatório";
    }
    if (cpf === "") {
      errorMessage.cpf = "O campo CPF é obrigatório";
    }
    if (telefone === "") {
      errorMessage.telefone = "O campo telefone é obrigatório";
    }
    if (Object.keys(errorMessage).length > 0) {
      //formRef.current.setErrors(errorMessage);
      throw errorMessage;
    }
  }
}
