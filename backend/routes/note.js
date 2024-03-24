const express = require('express')
const router = express.Router()
const NotesSchema = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
//ROUTE:1 get all notes using GET "/api/notes/getAllNotes". login required
router.get('/getAllNotes', fetchuser, async (req, res) => {
    try {
        const data1 = await NotesSchema.find({ user: req.userId })
        res.send(data1)
    } catch (error) {
        res.send(error)
    }
})

// router.put('/getSearchedData/:title', async (req, res) => {
//     const updatednote = await NotesSchema.find(req.params)  // here new is used for send newly update response
//     res.status(200).send(updatednote)
//     console.log(updatednote)
// })


//ROUTE:2 add a note using POST "/api/notes/getAllNotes". login required
router.post('/addnote', fetchuser,
    body('title', "Title must be greater 4 characters").isLength({ min: 3 }),
    body('description', "description must be 5  characters").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const { title, description, tag } = req.body;
        try {
            const note = await NotesSchema({ title, description, tag, user: req.userId })
            const savedNote = await note.save()
            res.status(200).send(savedNote)
            console.log("dddd", savedNote)
        } catch (error) {
            res.status(400).send(error)
        }
    })

//ROUTE:3 update existing note using PUT "/api/notes/updatenote". login required
router.put('/updatenote/:_id', fetchuser,
    body('title', "Title must be greater 4 characters").isLength({ min: 3 }),
    body('description', "description must be 5  characters").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        try {
            let note = await NotesSchema.findById(req.params)
            if (!note) {
                res.status(404).send("Not Found")
            }
            else {
                //Allow updation only if user owns this note
                if (note.user.toString() === req.userId) {
                    const updatednote = await NotesSchema.findOneAndUpdate(req.params, { $set: req.body }, { new: true })  // here new is used for send newly update response
                    res.status(200).send(updatednote)
                    console.log(updatednote)
                }
                else {
                    res.status(404).send("Not Allowed")
                }
            }
        } catch (error) {
            res.send(error)
        }
    })

//ROUTE:4 delete existing note using DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:_id', fetchuser, async (req, res) => {
    try {
        let note = await NotesSchema.findById(req.params)
        if (!note) {
            res.status(404).send("Not Found")
        }
        else {
            if (note.user.toString() === req.userId) {
                const deletednote = await NotesSchema.deleteOne(req.params)
                res.status(200).send({ "success": "Note has been deleted", "Note Detail": note })
            }
            else {
                res.status(404).send("Not Allowed")
            }
        }
        //Allow updation only if user owns this note

    } catch (error) {
        res.send(error)
    }
})

module.exports = router