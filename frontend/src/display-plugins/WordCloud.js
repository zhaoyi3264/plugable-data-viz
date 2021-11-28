import React, {Component} from 'react';
import ReactWordcloud from 'react-wordcloud';
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const size = [900, 600];

const options = {
    fontFamily: 'courier new',
    fontSizes: [20, 40],
    rotations: 2,
    rotationAngles: [-90, 0],
};


class WordCloud extends Component{
    constructor(props){
        super(props);
        this.state = {
            textData:props.displayData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.displayType === "wordCloud" && prevProps.dataType !== this.props.dataType){
            console.log("in update");
            this.setState({
                textData: this.props.displayData
            })
        }
    }

    get_tokens(text){
        try{
            var result = sentiment.analyze(text.toLowerCase());
            console.log(result);
            return result['calculation'];
        }catch (err){
            return [2,3,4,2,4];
        };


    }

    textToWords(){
        let words = [];
        let count = new Map();
        for(let i = 0; i < this.state.textData.length; i++){
            let calculation = this.get_tokens(this.state.textData[i]);
            console.log(calculation)
            for(let j = 0; j < calculation.length; j++){
                for(var key in calculation[j]){
                    let val = calculation[j][key]
                    console.log(typeof val);
                    console.log(val);
                    if(!count.has(key)){
                        count.set(key, val)
                    }else {
                        count.set(key, count.get(key) + val)
                    }
                }
            }
        }
        for(const [key, value] of count.entries()){
            words.push({text: key, value: value});
        }
        return words;
    }

    render() {
        let words = this.textToWords();
        console.log(words);
        return <div> <h4> <b>WordCloud Graph</b></h4>
            <ReactWordcloud words={words} size = {size} options={options}/></div>
    }
}

export default WordCloud;