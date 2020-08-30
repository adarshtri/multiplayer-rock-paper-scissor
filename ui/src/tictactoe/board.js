import React, {Component} from "react";
import Square from "./square";
import {Col, Row} from "antd";
import "antd/dist/antd.css";


export default class Board extends Component {

    constructor(props) {
        super(props);
        this.square_click_callback = this.square_click_callback.bind(this);
    }

    square_click_callback(location){
        console.log("Clicked")
        console.log(location)
    }

    render() {
        return(
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                height: "150px",
                width: "150px"
            }}
            className={"center"}>
                <Row>
                    <Col span={24}>
                        <Row gutter={[5, 5]}>
                            <Col span={8} className="gutter-row">
                                <Square location={[0, 0]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[0, 1]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[0, 2]} location_callback={this.square_click_callback}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[5, 5]}>
                            <Col span={8} className="gutter-row">
                                <Square location={[1, 0]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[1, 1]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[1, 2]} location_callback={this.square_click_callback}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[5, 5]}>
                            <Col span={8} className="gutter-row">
                                <Square location={[2, 0]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[2, 1]} location_callback={this.square_click_callback}/>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Square location={[2, 2]} location_callback={this.square_click_callback}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }
}