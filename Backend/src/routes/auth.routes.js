const express = require('express');
const router = express.Router();
const {registerController,loginController} = require('../controllers/auth.controllers');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register',registerController)
router.post('/login',loginController)

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user }); 
});

module.exports = router