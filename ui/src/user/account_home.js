import React, {Component} from "react";
import Cookies from "js-cookie";
import {Redirect} from 'react-router-dom';
import {Button, Card} from "antd";



export default class Account_info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const username = Cookies.get("username", undefined);
        if (username !== undefined && username !== null && username !== "undefined"){
            this.setState({username: username});
        }else{
            this.setState({username: undefined})
        }
        this.setState({checked: true})
    }

    logout(){
        Cookies.set("username", undefined);
        this.setState({username: undefined});
    }

    render() {


        if(this.state.username === undefined || this.state.username === "undefined"){
            return(<Redirect to={"/login"}/>);
        }

        else if(this.state.username === ""){
            return(<div></div>);
        }
        else{
            return (
                <div style={{padding: "20px", margin: "20px"}}>
                    <Card title={"Account Info"}>
                        <p>{"Username: " + this.state.username}</p>
                        <Button type={"primary"} onClick={this.logout}>Log Out</Button>
                    </Card>
                </div>
            );
        }

    }


}