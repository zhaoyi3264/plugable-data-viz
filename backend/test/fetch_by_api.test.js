const fetch_by_api = require('../data-plugins/fetch_by_api');


test('test fetch execute properly', () =>{
    let review = [];
    fetch_by_api(0).then(()=>{
        expect(review.length).toBe(0);
    });
    expect(review.length).toBe(0);
})