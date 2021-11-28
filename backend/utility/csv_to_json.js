
//csv to array of review objs
const Review = require("../utility/Review.js");

function csv_to_review(csv){
    let review_arr = [];
    for(let i = 0; i <　csv.length; i++){
        review_arr.push(csvToReview(csv[i]));
    }
    return review_arr;
}

function csvToReview(csv) {
    return new Review(
        csv['text'],
        csv['date'],
        csv['stars']
    );
}

module.exports = csv_to_review