const Review = require("../utility/Review.js");
const csv_to_review = require('../utility/csv_to_json.js');
const fs = require('fs');
// const csv = require('csv-parser');
const csv = require("csvtojson");
const path = require('path')

// reviews = [];
// fetch_by_csv('../routes/yelp.csv', reviews).then((message) => {
//     console.log(message);
//     // console.log(reviews);
// }).catch(message => {
//     console.log("error!");
// });
// .then(() =>{
//     console.log(reviews.length);
// });
// review_arr = [];

// console.log(arr.length);
function fetch_by_csv(dir, review_arr) {

    let results;
    // review_arr = [];
    // console.log("fetch!!!!!!!!!!");
    csv().fromFile(dir).then(jsonObj => {
        // console.log(jsonObj);
        // results = jsonObj;
        // console.log("parsed finish");
        // console.log(jsonObj[0]['text']);
        for (let i = 0; i < jsonObj.length; i++) {
            review_arr.push(new Review(jsonObj[i]['text'], jsonObj[i]['date'], jsonObj[i]['stars']));
        }
    }).then(() => {
        // console.log(review_arr);
        // return new Promise(resolve =>{
        //     reviews = review_arr;
        // });
        // console.log("return promise");

    });
    return new Promise(((resolve, reject) => {
        setTimeout(function() {
            // resolve the promise with some value\
            //make sure load csv within 500
            resolve("success");
        }, 500);
    }));

    //
    //
    // // console.log("sss");
    // let reviews_arr = csv_to_review(results);
    // for(let i = 0; i < reviews_arr.length; i++){
    //     console.log(results_arr[i].toString());
    // }
    // return reviews_arr;

}


module.exports = fetch_by_csv;