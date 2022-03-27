module.exports = class UserValidator {
  validate = ({name, email}) => {
      if(!name || !email) return false;
      else if(typeof(name) != "string" || typeof(email) != "string") return false;
      else if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return false;
      else return true;
  }
}