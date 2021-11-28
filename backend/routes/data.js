const express = require('express');
const path = require('path')
const router = express.Router();
const { init, store_review } = require("../storage.js");
const attributes = new Array("text", "date", "rating");
const fetch_data_api = require("../data-plugins/fetch_by_api");
const fetch_by_csv = require("../data-plugins/fetch_by_csv");

router.route('/load_data').get(async (req, res) => {
    let plugin_type = req.headers.plugin_type
    let num = 20;
    // let dir = './yelp.csv';
    let reviews = []
    console.log(plugin_type);
    init(attributes);
    let reviews_promise = null;
    switch (plugin_type) {
        case "api":
            reviews_promise = fetch_data_api(num, attributes);  //  promise
            reviews_promise.then((reviews) => {
                for (let i = 0; i < reviews.length; i++) {
                    store_review(reviews[i].toARRAY());
                }
            })
            break;
        case "csv":
            let dir = path.join(__dirname, "yelp_500.csv");
            console.log(dir);
            let reviews_arr = [];
            reviews_promise = fetch_by_csv(dir, reviews_arr).then(() => {
                console.log(reviews_arr);
                for (let i = 0; i < reviews_arr.length; i++) {
                    // console.log("xxxxx");
                    store_review(reviews_arr[i].toARRAY());
                }
            });

            // store_review(reviews, attributes);
            break;
        case "json":
            // code block
            break;
        default:
        // code block
    }
    Promise.allSettled([reviews_promise]).then(() => {
        res.json("Successfully stored data using " + plugin_type + " data plugin!");
    })
});

module.exports = router;
