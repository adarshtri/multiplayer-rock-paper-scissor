import React, {Component} from "react";
import Square from "./square";
import {Col, Row} from "antd";
import "antd/dist/antd.css";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Cookies from "js-cookie";


export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "choice": "circle"
        }
        this.square_click_callback = this.square_click_callback.bind(this);
    }

    componentDidMount() {
        this.setState({gameid: this.props.match.params.gameid, gameProps: this.props.location.state, choice: (this.props.location.state.data.gameDetails["cross"] === Cookies.get("username"))? "cross": "circle"})
    }

    square_click_callback(location){
    }


    render() {

        return(
            <Card>
                <CardHeader title={"TicTacToe"}/>
                <CardContent style={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: "20px",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        height: "150px",
                        width: "150px"
                    }}>
                        <Row>
                            <Col span={24}>
                                <Row gutter={[5, 5]}>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[0, 0]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[0, 1]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[0, 2]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[5, 5]}>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[1, 0]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[1, 1]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[1, 2]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[5, 5]}>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[2, 0]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[2, 1]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                    <Col span={8} className="gutter-row">
                                        <Square location={[2, 2]} location_callback={this.square_click_callback} choice={this.state.choice}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </CardContent>
            </Card>
        )
    }
}