import React, {Component} from "react";
import {Button} from "antd";
import {CloseOutlined, SmileOutlined} from "@ant-design/icons";


export default class Square extends Component{

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            choice: this.props.choice,
            background_icon: null,
            color: "grey"
        };
        this.change_square_state = this.change_square_state.bind(this);
    }

    change_square_state(){
        if(this.state.background_icon === null){
            if(this.state.choice === "cross")
                this.setState({background_icon: <CloseOutlined/>});
            else
                this.setState({background_icon: <SmileOutlined/>})
            this.setState({color: "red"});
        }else{
            this.setState({background_icon: null});
            this.setState({color: "grey"});
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