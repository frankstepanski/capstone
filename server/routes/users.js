const express = require('express');
const usersRouter = express.Router();
const { authenticate, getUserByUsername, createUser, getAllUsers, updateUser } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { requireUser } = require('./utils')

usersRouter.use((req, res, next) => {
    console.log('> A request has been made to the /users endpoint');
    next();
})

usersRouter.get('/', requireUser, async (req, res, next) => {
    const {admin} = req.user;
    try {
        if (admin) {
            const data = await getAllUsers();
            const users = data.map((user) => {
                delete user.password;
                return user;
            })
            res.send({ users })
        } else {
            res.send({status: 'failed', message: 'restricted'})
        }
    } catch (e) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })
    }
})

usersRouter.post('/register', async (req, res, next) => {
    const { 
        username, 
        password, 
        firstName, 
        lastName, 
        email,
        address,
        admin 
    } = req.body;
    console.log(`> UN: ${username}`)

    if (!username || !password || !firstName || !lastName || !email || !address){
        next({
            name: `MissingRequiredFields`,
            message: `Complete all required fields to create and account.`
        })
    } else if (password.length < 8) {
        next({
            name: `invalidPassword`,
            message: `Your password must be 8 characters or more`
        })
    }

    try {
        const _user = await getUserByUsername({username});
        console.log(_user)

        if (_user) {
            // If a user by that username already exists, the request is redirected to the /login route where it will attempt to authenticate the user with the parameters provided
            console.log(`User already exists. Logging in instead`)
            return res.redirect(308, './login');
        } else {
            const user = await createUser({
                username,
                password,
                firstName, 
                lastName, 
                email,
                address,
                admin 
            });
            
            //Once the new user is created, forward the request ./login to improve UX flow
            console.log(`User successfully created. Logging in.`)
            return res.redirect(308, './login');
        }
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: 'UsernameAndPasswordRequired',
            message: "A username and password are required to log in"
        })
    }
    try {
        const user = await authenticate({username, password});
        console.log(`>>> User: `, user)
        const { id, username: un, admin } = user;

        if (user) {
            const token = jwt.sign({id, un}, SECRET, {expiresIn: '1w'});
            res.send({ status: "success", message: "you're logged in!", token, admin});
        } else {
            console.log('user could not be logged in')
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is incorrect'
          });
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// Update non-read-only user informaiton:
usersRouter.patch('/update', requireUser, async (req, res, next) => {
    const user = req.user;

    // This block of code returns an array of only the object entries with !null values
    const filteredObj = {}
    Object.keys(req.body).forEach((key) => {
            if (req.body[key]) {
                filteredObj[key] = req.body[key];
            }
    })

    try {
        const { id } = user;
        const updatedUser = await updateUser(id, fields = filteredObj);
        console.log(updatedUser)
        return res.send({status: "success", message: "User updated", user: updatedUser});
        
    } catch (e) {
        next(e);
    }
})

module.exports = usersRouter;