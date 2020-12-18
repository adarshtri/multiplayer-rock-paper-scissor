import React, {Component} from "react";
import {Form, Input, Button, Card, message, Row, Col} from 'antd';
import Snackbar from '@material-ui/core/Snackbar';
import {login, handle_signup} from "../api_calls/user";
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


export default class Login_home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            already_logged_in: false,
            username: undefined,
            error_snackbar_open: false,
            error_snackbar_message: undefined
        }

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.handleErrorSnackBarClose = this.handleErrorSnackBarClose.bind(this);

    }

    componentDidMount() {
        if (Cookies.get("api_token") !== undefined && Cookies.get("api_token") !== null && Cookies.get("api_token") !== "undefined"){
            this.setState({"already_logged_in": true});
        }
    }

    usernameChangeHandler(event){
        this.setState({username: event.target.value});
    }

    login = () => {

        const loginStatus = login(this.state.username)

        loginStatus.then(data => {
            if(data["response_status"] === "OK"){
                Cookies.set("username", data["user_details"]["username"]);
                this.setState({already_logged_in: true})
            }else{
                this.setState({error_snackbar_message: data.response}, ()=>{
                    this.setState({error_snackbar_open: true});
                });
            }
        })
    }

    signup = () => {
        handle_signup(this.state.username);
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    handleErrorSnackBarClose(event, reason){
        this.setState({error_snackbar_open: false}, ()=>{
            this.setState({error_snackbar_message: undefined});
        });
    }

    render() {
        if(this.state.already_logged_in === true){
            message.success({content: "Already logged in.", duration: 2, style: {position: "fixed", left: "50%", top: "20%", color: "#316DC1"}})
            return <Redirect to={'/dashboard'}/>;
        }
        return (
            <div style={{padding: "20px", margin: "15px"}}>

                <Snackbar anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          open={this.state.error_snackbar_open} autoHideDuration={5000} onClose={this.handleErrorSnackBarClose}
                          message={this.state.error_snackbar_message}/>

                <Card>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            onChange={this.usernameChangeHandler}
                        >
                            <Input />
                        </Form.Item>

                        <Row>
                            <Col span={12}>
                                <Form.Item>
                                    <Button type="primary" onClick={this.login}>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" onClick={this.signup}>
                                        SignUp
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Card>

            </div>
        );
    }

}