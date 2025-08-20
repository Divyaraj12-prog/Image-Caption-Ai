const genrateCaption = require('../services/ai.services');
const postModel = require('../models/post.model');
const UploadFile = require('../services/image.services');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    const base64 = Buffer.from(file.buffer).toString('base64');

    
    const caption = await genrateCaption(base64);

    
    const result = await UploadFile(file.buffer, `${uuidv4()}`);

    
    const post = await postModel.create({
      caption:caption,
      image: result.url,
      user: req.user._id,
    });

    
res.status(201).json({
  message: "Post Created Succesfully",
  post
})
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = createPostController;
