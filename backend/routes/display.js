const express = require('express');
const router = express.Router();
const Review = require('../utility/Review.js')

const {get_attribute, store_review} = require("../storage.js")

router.route('/get_attribute').get(async (req, res) => {
    let attribute = req.headers.attribute;
    let data = get_attribute(attribute);
    console.log(typeof data);
    console.log(data);
    res.json(data);
});

module.exports = router;
