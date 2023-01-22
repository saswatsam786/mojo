const Posts = require("../models/postModel")

const postCtrl = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body

            if (images.lenght === 0)
                return res.status(400).json({ msg: "Please add an image" })

            const newPost = new Posts({
                content, images, user: req.user._id
            })

            await newPost.save()

            res.json({
                msg: 'Create Post!',
                newPost
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = postCtrl