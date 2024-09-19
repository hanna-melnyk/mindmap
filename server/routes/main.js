//server/routes/main.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const text = `Welcome to Mindmap app!`;
    res.json({description: text});
});


module.exports = router;