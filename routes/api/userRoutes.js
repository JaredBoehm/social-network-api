const router = require('express').Router()
const { User } = require('../../models')

// get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find()
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get one user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.id })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// create a user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.id })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add a friend
router.post('/:id/friends/:friendId', async (req, res) => { 
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a friend
router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router