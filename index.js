const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const JWT_SECRET = 'hellomynameislakshyagupta';

let users = [];
let loggedInIdx = [];
const generateToken = function () {
    let token = "";
    const values = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
        '3', '4', '5', '6', '7', '8', '9'
    ]
    const len = values.length;
    for (let i = 0; i < 32; i++) {
        let randValue = values[Math.round(Math.random() * len)];
        token += randValue;
    }
    return token;
}

const signupHandler = function (req, res) {
    // console.log(req);
    const { username, password } = req.body;
    let foundAlreadyFound = users.find(user => user.username == username);
    let message = "User successfully added";
    let statusCode = 200;
    if (foundAlreadyFound) {
        message = "User already Found";
        statusCode = 404;
    }
    else users.push({ username, password, loggedIn: false });
    // console.log(users);
    res.status(statusCode).json({
        message: message
    })
}

const signinHandler = function (req, res) {
    const { username, password } = req.body;
    let foundIdx;
    let foundAlreadyFound = users.find((user, i) => {
        if (user.username == username) {
            foundIdx = i;
            return user;
        }
    });
    let statusCode = 404;
    if (!foundAlreadyFound) message = "User not exists";
    else if (foundAlreadyFound.loggedIn) message = "Already signined"
    else {
        loggedInIdx = loggedInIdx.forEach(e => {
            users[e].loggedIn = false;
        })
        loggedInIdx = [];
        message = generateToken();
        const jwtToken = jwt.sign({ username: foundAlreadyFound.username }, JWT_SECRET);
        // console.log(jwtToken);
        users[foundIdx].jwtToken = jwtToken
        users[foundIdx].token = message;
        users[foundIdx].loggedIn = true;
        loggedInIdx.push(foundIdx);
        message = jwtToken;
        statusCode = 200;
        console.log(users);

    }
    res.status(statusCode).json({
        message: message
    })
}



const authHandler = function (req, res, next) {
    // console.log(req.headers);
    const token = req.headers.token;
    if (!token) {
        return res.json({
            istoken: false
        })
    }
    const data = jwt.verify(token, JWT_SECRET);
    let userDetails = users.find(e => e.username == data.username);
    if (!userDetails) {
        return res.json({
            isUser: false
        })
    }
    // console.log(users);
    // console.log(userDetails);
    let isLoggedIn = userDetails.loggedIn;
    // console.log(isLoggedIn);
    if (isLoggedIn) {
        req.username = userDetails.username;
        req.password = userDetails.password;
        next();
    }
    else {
        res.json({
            message: "User is not logged in"
        })
    }
}

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
app.post("/signup", signupHandler);
app.post('/signin', signinHandler);
app.get("/me", authHandler, (req, res) => {
    res.json({ username: req.username, password: req.password, isUser: true, istoken: true });
})


app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`app is running on http://localhost:${port}`);
});