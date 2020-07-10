const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.render('tasks/index') });

module.exports = router;