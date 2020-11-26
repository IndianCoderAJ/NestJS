const express = require('express');
const router = express.Router();
const linksController = require('../Controller/Links');

//
router.get('/', async(req, res) => {
    linksController.getLink(req, res);
})

router.post('/', async(req, res) => {
    linksController.postLink(req, res);
})

router.put('/', async(req, res) => {
    linksController.putLink(req, res);
})

router.delete('/', async(req, res) => {
    linksController.deleteLink(req, res);
})



module.exports = router;