const express = require('express');
const router = express.Router();
const linksController = require('../Controller/Links');

//
router.get('/:code',async(req,res) => {
    linksController.redirectLink(req,res);
})

module.exports = router;