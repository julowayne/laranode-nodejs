
require('dotenv').config()
const http = require("http");
const UserController = require('./app/Controllers/UserController');
const UserValidator = require('./app/Validator/UserValidator');

const server = http.createServer(async (req,res) => {

    // Function to send data to post url
    const getPostData = async (req) => {
        return new Promise((resolve, reject) => {
            let totalChunked = ""
            req.on("error", err => {
                console.error(err);
                reject();
            })
            .on("data", chunk => {
                totalChunked += chunk;
            })
            .on("end", () => {
                req.body = JSON.parse(totalChunked);
                resolve();
            })
        })
    }


    // All routes
    if(req.url == "/users" && req.method === "GET"){
        const userController = new UserController(req, res);
        const users = await userController.get();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
    }
    else if(req.url.match(/^\/user\/(\d+)/) && req.method === "GET"){
        const id = req.url.match(/^\/user\/(\d+)/)[1];
        const userController = new UserController(req, res);
        const user = await userController.get(id);
        if(user){
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(user));
        }
        else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({error: "L'utilisateur que vous cherchez n'existe pas"}));
        }
        res.end();
    }
    else if(req.url == "/user" && req.method === "POST"){
        await getPostData(req);
        const validator = new UserValidator();
        if(!validator.validate(req.body)){
            res.writeHead(422, { "Content-Type": "application/json" });
            res.write(JSON.stringify({error: "Verifiez les données que vous avez saisi"}));
        }
        else{
            const userController = new UserController(req, res);
            const user = await userController.create(req.body);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.write(JSON.stringify(user));
        }
        res.end();
    }
    else if(req.url.match(/^\/user\/(\d+)/) && req.method === "DELETE"){
        const id = req.url.match(/^\/user\/(\d+)/)[1];
        const userController = new UserController(req, res);
        const result = await userController.delete(id);
        if(result){
            res.writeHead(204, { "Content-Type": "application/json" });
        }
        else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({error: "L'utilisateur que vous cherchez n'existe pas"}));
        }
        res.end();
    }
    else if(req.url.match(/^\/user\/(\d+)/) && req.method === "PUT"){
        await getPostData(req);
        const id = req.url.match(/^\/user\/(\d+)/)[1];
        const validator = new UserValidator();
        if(!validator.validate(req.body)){
            res.writeHead(422, { "Content-Type": "application/json" });
            res.write(JSON.stringify({error: "Verifiez les données que vous avez saisi"}));
        }
        else{
            const userController = new UserController(req, res);
            const user = await userController.edit(id, req.body);
            if(user){
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(user));
            }
            else{
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({error: "L'utilisateur que vous cherchez n'existe pas"}));
            }
        }
        res.end();
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "La route que vous cherchez n'existe pas" }));
    }
})

// Server listening on port 3000
server.listen(3000);