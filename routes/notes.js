const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1:  Fetch All Notes using :GET "/api/notes/fetchnotes". No login required
router.get('/fetchnotes',fetchuser, async(req,res)=>{
    try {
        const note = await Note.find({user: req.user.id});
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
    }
    
})


//ROUTE 2:  Add Notes using :POST "/api/notes/addnote".Login required
router.post('/addnote', fetchuser, [
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 caharacters').isLength({ min: 5 }),
], async(req,res)=>{
     try {
        const {title, description, tag} = req.body;
    //check errors, if yes return bad request with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
          title,
          description,
          tag,
          user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
     }
    
})


//ROUTE 3:  Update existing Note :PUT "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    try {
        const {title, description, tag} = req.body;

       //Create a newNote
        const newNote = {}
        if(title){newNote.title = title} 
        if(description){newNote.description = description} 
        if(tag){newNote.tag = tag} 

        //Security purposes: Check if the note exists that users want to update.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")}

        //Security purposes: Check if the note User id match with the Logged In user id.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!")
        }

        //Find a new Note to be updated and then update it!
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
    }
})



//ROUTE 4:  Delete existing Note :DELETE "/api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body;
    try {
        //Security purposes: Check if the note exists that users want to update.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")}

        //Security purposes: Check if the note User id match with the Logged In user id.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success" : "Note has been deleted" , note : note});
    

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
    }
})

module.exports = router