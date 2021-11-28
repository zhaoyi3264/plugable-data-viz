const fetch_by_csv = require('../data-plugins/fetch_by_csv');


test('test fetch execute properly', () =>{
    let dir = __dirname + "\\yelp_500.csv";
    let review = [];
    fetch_by_csv(dir, review).then(()=>{
        expect(review.length).toBe(500);
    });
    expect(review.length).toBe(0);
})