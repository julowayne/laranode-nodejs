module.exports = class User {
  // missing password because no gestion of it in routes methods
  constructor({id, name, email, created_at, updated_at}){
      this.id = id
      this.name = name
      this.email = email
      this.created_at = created_at
      this.updated_at = updated_at
  }

  getData = () => {
      return {
          "id": this.id,
          "name": this.name,
          "email": this.email,
          "created_at": this.created_at,
          "updated_at": this.updated_at
      }
  }
}
