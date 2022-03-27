const User = require("../Models/User");
const UserRepository = require("../Repository/UserRepository");

module.exports = class UserController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    create = async (user) => {
        const userRepository = new UserRepository();
        const newUser= await userRepository.create(user);
        return new User(newUser).getData();
    }

    get = async (id = null) => {
        const userRepository = new UserRepository();
        if(id){
            const user = await userRepository.get(id);
            if(user) return new User(user).getData();
            else return false;
        }
        else{
            const users = await userRepository.all();
            const data = [];
            users.forEach(user => { 
                data.push(new User(user).getData());
            })
            return data;
        }
    }

    delete = (id) => {
        const userRepository = new UserRepository();
        return userRepository.delete(id);
    }

    edit = async (id, user) => {
        const userRepository = new UserRepository();
        const newUser = await userRepository.update(id, user);
        if(newUser) return new User(newUser).getData();
        else return false;
    }

}
