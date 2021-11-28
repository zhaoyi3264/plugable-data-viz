import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import BarChart from "./display-plugins/BarChart";
import PieChart from "./display-plugins/PieChart";
import WordCloud from "./display-plugins/WordCloud";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Form, Row} from "react-bootstrap";
import logo from './dashboard.jpg';
import bg from './bg.jpg';
// import bg from './bg.png'
import * as PropTypes from "prop-types";

// import Jumbotron from 'react-bootstrap/Jumbotron';
// store = {data_plugin : "", display_plugin: ""}
class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //currently selected data plugin
            data_plugin: "",
            //currently selected display plugin
            display_plugin: "",
            data: [],
            //this records the number of times visualized button is clicked
            showGraph: 0,
            data_plugin_val: "",
            display_plugin_val: ""
            // prev_data_plugin: "",
            // prev_display_plugin: ""
            // selected : ""

        }
    }

    handleDataPluginChange = changeEvent => {
        // this.state.prev_data_plugin = this.state.data_plugin;
        this.setState({
            data_plugin_val: changeEvent.target.value
        });
        // this.state.data_plugin_val = changeEvent.target.value;
        console.log(this.state.data_plugin_val);
    };
    handleDisplayPluginChange = changeEvent => {
        // this.state.prev_display_plugin = this.state.display_plugin;
        this.setState({
            display_plugin_val: changeEvent.target.value
        });
        // console.log(this.state.display_plugin);
        // this.state.display_plugin_val = changeEvent.target.value;
        console.log(this.state.display_plugin_val);
    };
    // handleFormSubmit = formSubmitEvent => {
    //     formSubmitEvent.preventDefault();
    //     console.log("You have submitted:", this.state.data_plugin, "and ", this.state.display_plugin);
    // };
    handleClick = clickEvent => {
        clickEvent.preventDefault();
        if (this.state.data_plugin_val === "" || this.state.display_plugin_val === "") {
            console.log("One or more the input is missing!");
            return;
        }
        else if(this.state.data_plugin === this.state.data_plugin_val){  //  if already fetched data
            this.fetch_data(this.state.display_plugin_val).then(()=>{
                this.setState({
                    display_plugin: this.state.display_plugin_val,
                });
            })
        }
        else{
            console.log("You have submitted:", this.state.data_plugin_val, "and", this.state.display_plugin_val);
            console.log(this.state.data_plugin_val, "prepared to load");
            Promise.allSettled([this.load(this.state.data_plugin_val)]).then(() => {
                console.log(this.state.display_plugin_val, "prepared to fetch");
                return this.fetch_data(this.state.display_plugin_val);
            }).then(() => {
                this.setState({
                    data_plugin: this.state.data_plugin_val,
                    display_plugin: this.state.display_plugin_val,
                });
            }).then(()=>{
                this.forceUpdate();
            });

            // this.setState({
            //     showGraph : show
            // });
            // this.state.showGraph++;
            // console.log("xxxxx", this.state.showGraph);
        }

    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.display_plugin !== this.state.display_plugin) {
    //         console.log(this.state.display_plugin, "prepared to fetch");
    //         this.fetch(this.state.display_plugin);
    //     }
    //     if (prevProps.data_plugin !== this.state.data_plugin) {
    //         console.log(this.state.display_plugin, "prepared to load");
    //         this.load(this.state.data_plugin);
    //     }
    // }

    //  load data into database using different data plugin based on front end action
    load(data_plugin) {
        console.log("trying to load data via data_plugin: ", data_plugin);
        return fetch("http://localhost:9000/data/load_data", {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'plugin_type': data_plugin,
            },
        }).then(() => {
            console.log(`Finish loading data into the dataframe using ${data_plugin}!`);
        }).catch(err => {
            // Failure
            console.log(err);
        });
    }

    //  fetch different display plugin based on front end action
    fetch_data(display_plugin) {
        let attribute = "";
        switch (display_plugin) {
            case "wordCloud":
                attribute = "text";
                break;
            case "pieChart":
                attribute = "date"
                break;
            case "barChart":
                attribute = "rating";
                break;
            default:

        }
        console.log("want to fetch attribute: ", attribute);
        return fetch("http://localhost:9000/display/get_attribute", {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'attribute': attribute,
            },
        }).then((response)=>response.json())
            .then((res) => {
            res = JSON.parse(res);
            console.log(res);
            let attribute_data = res[attribute];  //  array of items
            // console.log(attribute_data.length);
            this.setState({data: attribute_data})
        }).catch(err => {
            // Failure
            console.log(err);
        });
    }


    render() {
        const stylePlugins = {
            padding: '10px',
            // paddingBottom: '10px',
            borderRadius: '10px',
            border: '1px solid rgb(0,255,255)',
            backgroundColor: 'white',
            height: "80vh"
        };
        const styleGraphs = {
            padding: '10px',
            // paddingBottom: '10px',
            borderRadius: '10px',
            border: '1px solid rgb(192,192,192)',
            backgroundColor: 'white',
            height: "80vh",

        };
        const mainStyles = {
            padding: '10px',
            // paddingBottom: '10px',
            border: '1px solid rgb(192,192,192)',
            backgroundImage: `url(${bg})`,
            height: "100vh",
            // fontFamily : "Roboto, sans-serif",
            fontFamily: "Outfit, sans-serif"
        };
        const styleContainer = {
            marginTop: '15px',
            marginBottom: '10px'
        }
        // const formLabelStyle ={
        //     fontcolor(color) {
        //         color = "blue"
        //     }
        // }
        const textColor = {
            color: '#00BFFF'
        };
        return (
            <div className="App" style={mainStyles}>
                <div className="App-header text-center">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h2>Data Visualization Framework</h2>

                </div>


                <Container>
                    <Row xs={1} md={3}>
                        <Col md={3}>
                            <div className="plugins" style={stylePlugins}>
                                <div className="text-center" style={styleContainer}>
                                    <h5>Please select one data plugin and one display plugin.</h5>
                                </div>
                                <div className="container" style={styleContainer}>
                                    <Form>
                                        <fieldset>
                                            <Form.Group as={Row} className="mb-3">
                                                <div className="text-center">
                                                    <Form.Label style={textColor}>
                                                        Data Plugins
                                                    </Form.Label>
                                                </div>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Yelp Review Data Plugin"
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios1"
                                                        value='api'
                                                        checked={this.state.data_plugin_val === 'api'}
                                                        onChange={this.handleDataPluginChange}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="CSV File Data Plugin"
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios2"
                                                        value="csv"
                                                        checked={this.state.data_plugin_val === 'csv'}
                                                        onChange={this.handleDataPluginChange}
                                                        // className="form-check-input"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                    </Form>
                                    <Form>
                                        <fieldset>
                                            <Form.Group as={Row} className="mb-3">
                                                <div className="text-center">
                                                    <Form.Label style={textColor}>
                                                        Display Plugins
                                                    </Form.Label>
                                                </div>
                                                <Col sm={10}>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Word Cloud Plugin"
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios1"
                                                        value="wordCloud"
                                                        checked={this.state.display_plugin_val === 'wordCloud'}
                                                        onChange={this.handleDisplayPluginChange}
                                                        // className="form-check-input"
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="Bar Chart Plugin"
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios2"
                                                        value="barChart"
                                                        checked={this.state.display_plugin_val === 'barChart'}
                                                        onChange={this.handleDisplayPluginChange}
                                                        // className="form-check-input"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                        <div className="form-check  text-center">
                                            <Button variant="outline-primary" type="submit"
                                                    onClick={this.handleClick}>Visualize</Button>{' '}
                                        </div>
                                    </Form>


                                </div>
                            </div>
                        </Col>
                        <Col md={9} style={styleGraphs}>
                            <Row className="text-center" style={styleContainer}>
                                <h5></h5>
                            </Row>
                            {/*control this class based on the handleclick*/}
                            <div className="displays text-center">
                                {this.renderElement()}
                                {/*<img src={logo} alt="logo"/>*/}
                                {/*<Graph displayType={this.state.display_plugin} displayData={this.state.data}/>*/}
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }

    renderElement() {
        if (this.state.display_plugin === "" || this.state.data_plugin === ""
            || typeof this.state.data === "undefined" || this.state.data.length === 0) {
            return <div><h4><b>Welcome!</b></h4><img src={logo} alt="logo"/></div>;
        } else {
            //fixme
            // render elt only get changed when user clicked button, not clicked the radio button!
            // console.log(this.state.data);
            console.log("enter here");
            return <DisplayPlugin displayType={this.state.display_plugin} dataType = {this.state.data_plugin} displayData={this.state.data}/>;
        }
    }
}

//Call Display Plugins
class DisplayPlugin extends Component {
    render() {
       //display plugin register here
        switch (this.props.displayType) {
            case "wordCloud":
                console.log(this.props.displayData);
                return <WordCloud displayType = {this.props.displayType} dataType = {this.props.dataType} displayData={this.props.displayData}/>;
            case "pieChart":
                console.log(this.props.displayData);
                return <PieChart displayType = {this.props.displayType} dataType = {this.props.dataType} displayData={this.props.displayData}/>;
            case "barChart":
                console.log(this.props.displayData);
                return <BarChart displayType = {this.props.displayType} dataType = {this.props.dataType} displayData={this.props.displayData}/>;
            default:
                return (<></>);
        }
    }
}

export default App;