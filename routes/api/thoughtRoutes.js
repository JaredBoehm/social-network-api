const router = require('express').Router()
const { Thought, User } = require('../../models')
const { route } = require('./userRoutes')

// get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find()
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get one thought 
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.id })
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// create a thought
router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body)
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtData } },
            { new: true }
        )
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a thought
router.put('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a thought
router.delete('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id })
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add a reaction
router.post('/:id/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true }
        )
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a reaction
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        res.status(200).json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router