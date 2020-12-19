import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Board from "./tictactoe/board";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Col, Layout, Row} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Cookies from "js-cookie";
import Home from "./home/home";
import SiderMenu from "./home/sider_menu";
import Login_home from "./user/login_home";
import Account_info from "./user/account_home";

const { Header, Footer, Sider, Content } = Layout;

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sider_state: true
    }

    this.toggle_sider = this.toggle_sider.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

  }

  isLoggedIn(){
    return !(Cookies.get("username") === "undefined" || Cookies.get("username") === undefined || Cookies.get("username") === null);
  }

  toggle_sider(){
    this.setState({sider_state: !this.state.sider_state});
  }

  render() {
    return(
          <Router>
            <div>
              <Layout>
                <Sider collapsed={this.state.sider_state}>
                  <SiderMenu/>
                </Sider>

              <Layout>
                <Header style={{background: "white", height: "120px", float: "left"}}>
                  <Row>
                    <Col span={2}>
                      <div className="left">
                        {React.createElement(this.state.sider_state ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: this.toggle_sider,
                        })}
                      </div>
                    </Col>
                    <Col span={22} className={"center"}>
                        <h1 style={{color: "#316DC1", margin: "20px"}}>World of Board Games</h1>
                    </Col>
                  </Row>
                </Header>
                <Content>
                  <div className={"center"} style={{margin: "10px"}}>
                    <Switch>

                      <Route path="/game/tictactoe/:gameid" exact render={(props)=>(
                          !this.isLoggedIn()?(<Redirect to={"/login"}/>):(<Board {...props}/>)
                      )}/>

                      <Route path="/home" exact render={()=>(
                          !this.isLoggedIn()?(<Redirect to={"/login"}/>):(<Home/>)
                      )} name="gamehome"/>

                      <Route path="/login" exact render={()=>(
                          !this.isLoggedIn()?(<Login_home/>):(<Redirect to={"/home"}/>)
                      )} name="login_home"/>

                      <Route path="/user/account" exact render={()=>(
                          !this.isLoggedIn()?(<Redirect to={"/login"}/>):(<Account_info/>)
                      )}/>

                      <Redirect exact from="" to={"/home"}/>
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  ADARSHTRI ©2020
                </Footer>
              </Layout>
              </Layout>
            </div>
          </Router>
        )
  }
}
