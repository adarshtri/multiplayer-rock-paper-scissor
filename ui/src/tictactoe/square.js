import React, {Component} from "react";
import {message, Button} from "antd";
import {CloseOutlined, SmileOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";

export default class Square extends Component{

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            choice: this.props.choice,
            turn: this.props.turn,
            background_icon: null,
            color: "grey",
            show_not_your_turn_alert: true,
            gameProps: this.props.gameProps
        };
        this.change_square_state = this.change_square_state.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({choice: nextProps.choice, turn: nextProps.turn, show_not_your_turn_alert: !nextProps.turn, gameProps: nextProps.gameProps}, ()=>{
            if(this.state.gameProps){
                if(this.state.gameProps.data.gameDetails.moves[this.state.location[0]][this.state.location[1]] !== ""){
                    if(this.state.gameProps.data.gameDetails.moves[this.state.location[0]][this.state.location[1]] === "cross"){
                        this.setState({background_icon: <CloseOutlined/>});
                        this.setState({color: "red"});
                    }else{
                        this.setState({background_icon: <SmileOutlined/>});
                        this.setState({color: "yellow"});
                    }
                }
            }

        });
    }

    change_square_state(){
        if(this.state.gameProps.data.gameDetails.hasOwnProperty("winner")){

            let content = "";

            if(this.state.gameProps.data.gameDetails.winner === Cookies.get("username"))
                content = "You've won :)"
            else
                content = "Your opponent has won :("

            message.config({top: 100})
            message.info({content: content, duration: 2});
        }
        else if(this.state.gameProps.data.players.length !== 2){
            message.config({top: 100})
            message.error({content:"Let the other player join. Share the game id with your friends.", duration: 2});
        }else if(this.state.gameProps.data.gameDetails.moves[this.state.location[0]][this.state.location[1]] !== ""){
            message.config({top: 100})
            message.error({content:"This box is already filled.", duration: 2});
        } else if(this.state.turn){
            this.setState({turn: false}, ()=>{
                if(this.state.background_icon === null){
                    if(this.state.choice === "cross") {
                        this.setState({background_icon: <CloseOutlined/>});
                        this.setState({color: "red"});
                    } else{
                        this.setState({background_icon: <SmileOutlined/>});
                        this.setState({color: "yellow"});
                    }
                }else{
                    this.setState({background_icon: null});
                    this.setState({color: "grey"});
                }
                this.props.location_callback(this.props.location);
            });
        } else{
            message.config({top: 100})
            message.error({content:"Not you turn.", duration: 2});
        }
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