const express = require('express');
const router = express.Router();

router.get('/test', () => console.log('get test'));

module.exports = router;
