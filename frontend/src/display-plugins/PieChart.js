import React, {Component} from 'react';

class PieChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    render() {
        return (
            <div>
                <h1>Move the mouse around!</h1>

            </div>
        );
    }
}

export default PieChart;