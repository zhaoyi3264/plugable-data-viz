const DataFrame = require('dataframe-js').DataFrame;
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const Review = require('./utility/Review.js')
let df = null;

function init(attributes){
    df = new DataFrame([]  // <------- A row
        , attributes.concat("sensitivity"));  //  sensitivity of text
}

function store_review(review){
    // console.log(review)
    // console.log(attributes);
    // console.log(typeof Object.keys(attributes));
    let score = get_sentiment(review[0]);
    df = df.push(review.concat(score));
    df.show();
    console.log("start storing...");
    console.log(df.dim())
}

function get_sentiment(text){
    var result = sentiment.analyze(text);
    console.log(result);
    return result['score'];
}

function get_attribute(attribute){
    console.log(attribute)
    return df.select(attribute)
}

module.exports = {init, get_attribute, store_review};
