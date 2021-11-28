import React, {Component} from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts'

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.displayData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps.dataType, " ", this.props.dataType);
        if(this.props.displayType === "barChart" && prevProps.dataType != this.props.dataType){
            console.log("in update");
            this.setState({
                chartData: this.props.displayData
            })
        }
    }

    render() {
        let ratings = [0, 0, 0, 0, 0]
        for (let i = 0; i < this.state.chartData.length; i++) {
            // console.log(typeof this.state.chartData[i]);
            if (this.state.chartData[i] == 1) {
                ratings[0]++;
            } else if (this.state.chartData[i] == 2) {
                ratings[1]++;
            } else if (this.state.chartData[i] == 3) {
                ratings[2]++;
            } else if (this.state.chartData[i] == 4) {
                ratings[3]++;
            } else if (this.state.chartData[i] == 5) {
                ratings[4]++;
            }
        }
        const options = {
            title: {
                text: "ML based Rating Chart"
            },
            animationEnabled: true,
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        {label: "Rating 1", y: ratings[0]},
                        {label: "Rating 2", y: ratings[1]},
                        {label: "Rating 3", y: ratings[2]},
                        {label: "Rating 4", y: ratings[3]},
                        {label: "Rating 5", y: ratings[4]}
                    ]

                }
            ]
        }

        return (
            <div>
                {/*<h1>React Column Chart</h1>*/}
                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default BarChart;


