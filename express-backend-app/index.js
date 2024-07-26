const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyparser.json());

let USERS = [];

//admin array
const ADMINS = {
    "user@admin.com": "Pass123"
};

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];
const SUBMISSIONS = [];


//check user is admin on not
function isAdmin(req,res,next){
    const{email, password} = req.body;

    if(ADMINS[email] && ADMINS[email] === password){
        next(); //if admin user procced to next route 
    } else{
        res.status(403).send('You are not an admin');
    }
}

app.post('/signup', function (req, res){
    //decode boy
    const {email,password} = req.body;

    const userExists = USERS.find(user => user.email === email);
    if(userExists){
        return res.status(400).send('User already exists');
    }

    //store email and password in the USERS array
    USERS.push({email,password});
    res.status(200).send('User signed up successfully');

});

app.post('/login', function (req, res){
    //decode body
    const{email,password}= req.body;

    //check if user exists
    const user = USERS.find(user=>user.email === email);

    if(!user){
        res.status(401).send('Invalid email or password');
    }

    //Genrate a toke (random sting)
    const token = Math.random().toString(36).substring(2);

    res.status(200).send({message: 'Login Successfu', token});
});

app.get('/questions', function (req, res){
    res.status(200).json(QUESTIONS);
    
});

app.get('/submissions', function (req, res){
  res.status(200).json(SUBMISSIONS);
});

//End pont to submit a problem
app.post('/submissions',function(req,res){
    const {problemId, submission} = req.body;

    const isAccepted = Math.random >0.2;

    SUBMISSIONS.push({problemId,submission,isAccepted});

    res.status(200).json({isAccepted});
});

// add new problem (admin only)

app.post('/problems',isAdmin, function(req, res){
    const {title, description, testCases} =- req.body;

    if(!title || !description || !testCases){
        res.status(400).send('Bad request: Missing required fields');
    }

    QUESTIONS.push({title,description,testCases});

    res.status(201).send('Problem added Successfully');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
