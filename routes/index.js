const express = require('express');

const router = express.Router();

router.use('/emoticons', require('./emoticons'));
router.use('/tags', require('./tags'));

module.exports = router;
