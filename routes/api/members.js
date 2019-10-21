const express = require('express');

//Import the express router
const router = express.Router();

//Imports the members module, ps the coordinate is relative to the current file location
var members = require("../../Members");

//This is supposed to help us get  IDs
const uuid = require('uuid');

//Gets all members(Because we already put the path in the index.js file we dont need to repeat it here)
router.get('/', (req, res) =>{
    res.json(members);
});

//Gets a single member, the id parameter is an additional variable that the user can input
router.get('/:id', (req, res) => {

    //What some does, is it runs through the array and gives us a true or false value
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found === false)
    {
        //The status 400 means a bad request
        res.status(400).json("There is no member with that Id here!");
    }

    // I used parseInt because the member id is an integer(Got the type from the members array object) where as the req.params.id would return a string
    res.json(members.filter(member => member.id === parseInt( req.params.id)));
});

//Creates a member, whenever you are creating something or adding to a server you want to make a post request
router.post('/', (req,res) => {

    //A new member
   const newMember = {
    id: uuid.v4(),
       name: req.body.name,
       email: req.body.email,
       status: 'Active'
   }

   //If there is no name or email on the object
   if(!newMember.name || !newMember.email)
   {
       //It is a bad request
      return res.status(400).json( 'Please include a name and email');
   }
   //Put the new object on the array(With the spread operator, cant do this in react alot of the time since I am not allowed to directly affect state)
   //members = [...members, newMember]

    //Put the new object on the array, done with the push method
    members.push(newMember);

   return res.json(members);
});

//Most of the time when you update something on a server it will be a put request
router.put('/:id', (req, res) =>{
    //What some does, is it runs through the array and gives us a true or false value
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found === false)
    {
        //The status 400 means a bad request
        res.status(400).json("There is no member with that Id here!");
    }
    else{
        //For each member in the members array
        members.forEach(member =>{
            //Check if the Id are the same
            if(member.id === parseInt(req.params.id))
            {
                //Update the name and the body, if they were changed
                member.name = req.body.name ? req.body.name:member.name;
                member.email = req.body.email ? req.body.email: member.email;

                res.json({msg: 'Member was updated', member});
            }
        })
    }

})

router.delete('/:id', (req,res) =>{

    if(req.params.id == false) {
        res.json("You must put in the id of the user you wish to delete");
    }
    else{
        //Loop through the array
        members.forEach();
    }

})
module.exports = router;