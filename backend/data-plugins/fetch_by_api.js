const Review = require("../utility/Review.js");

let yelpAPI = require('yelp-api');

// Create a new yelpAPI object with your API key
let apiKey = 'CNAm0XYfTnHb9C-o-_MEMd_bPAWECU6PGCJq0xzxqO3BTKrOab9b1WThZs5yhFN3Sp47P9y-UxAfNLeEniCEgSiOJwt9AevDz4XNDeVmkoFrPeHt6BReH4EWihydYXYx';
let yelp = new yelpAPI(apiKey);

// let res = fetch_data_api(10, null);
// res.then((res)=>{
//     console.log("here")
//     console.log(res.length)
// })
let offset = 0;

function get_business_id(num){
    let ids = []
    // Set any parameters, if applicable (see API documentation for allowed params)
    let promises = []
    for (let j = 0; j < Math.floor((num + 24) / 25); j++) {
        let limit = Math.min(25, num - j * 25);
        let params = [{
            location: "Pittsburgh"
            , radius: 40000
            , limit: limit
            , offset: offset
        }];
        offset += limit;
        // Call the /businesses/search endpoint
        promises.push(
        yelp.query('businesses/search', params)
            .then(data => {
                // Success
                // console.log(data);
                const json = JSON.parse(data);
                let entries = json["businesses"];
                for (let i = 0; i < entries.length; i++) {
                    ids.push(entries[i]["id"]);
                }
                console.log(ids.length);
            })
            .catch(err => {
                // Failure
                console.log(err);
            }));
    }
    return Promise.allSettled(promises).then(() => {
        console.log("123");
        console.log(ids.length);
        return ids;
    });
}

//  modified based on the actual json structure of different API
function jsonToReview(json){
    return new Review(
        json['text'],
        json['time_created'],
        json['rating']
    )
}

function get_business_reviews(id){
    let params = [{ locale: 'en_US' }];
    let reviews = []
// Call the endpoint
    let promise = [];
    promise.push(yelp.query(`businesses/${id}/reviews`, params)
        .then(data => {
            // Success
            // console.log(data);
            const json = JSON.parse(data);
            let entries = json["reviews"];
            for(let i = 0; i < entries.length; i++){
                reviews.push(jsonToReview(entries[i]));
            }
            // console.log(reviews);
        })
        .catch(err => {
            // Failure
            console.log(err);
        }));
    return Promise.allSettled(promise).then(()=>{
        return reviews;
    });
}

function fetch_data_api(num, attributes) {
    let id_promise = get_business_id(num);
    let b = id_promise.then((ids) => {
        let all_reviews = []
        promises = []
        for (let i = 0; i < ids.length; i++) {
            console.log(ids[i]);
            promises.push(get_business_reviews(ids[i]).then((value) => {
                console.log("after business");
                console.log(value);
                return value;
            }).catch(err => {
                // Failure
                console.log(err);
            }));
        }
        console.log(all_reviews.length);
        return Promise.all(promises).then((value)=>{
            return value.flat();
        });
    });
    return Promise.all([id_promise, b]).then((value)=>{
        console.log(value[1].length);
        return value[1];
    });
    // }
}















module.exports = fetch_data_api