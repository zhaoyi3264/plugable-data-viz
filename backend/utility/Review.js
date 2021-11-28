class Review {
    constructor(text, date, rating) {
        this.text = text;
        this.date = date;
        this.rating = rating;
    }

    toJSON() {
        return {
            text: this.text,
            date:  this.date,
            rating: this.rating
        };
    }

    toARRAY(){
        return [this.text, this.date, this.rating]
    }

}

module.exports = Review