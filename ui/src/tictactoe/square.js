import React, {Component} from "react";
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";


export default class Square extends Component{

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            background_icon: null,
            color: "grey"
        };
        this.change_square_state = this.change_square_state.bind(this);
    }

    change_square_state(){
        if(this.state.background_icon === null){
            this.setState({background_icon: <CloseOutlined/>});
            this.setState({color: "red"});
        }
        this.props.location_callback(this.props.location);
    }

    render() {

        return (<div>

            <Button style={
                    {
                        height: "50px",
                        width: "50px",
                        backgroundColor: this.state.color
                    }
                }
                icon={this.state.background_icon}
                onClick={this.change_square_state}
                block={true}
                    size={"large"}
            >{' '}</Button>
        </div>)
    }
}