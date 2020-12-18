import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {
    HistoryOutlined,
    SmileOutlined,
    SettingOutlined,
    ToolOutlined,
    FireFilled
} from '@ant-design/icons';

const {SubMenu} = Menu;


export default class SiderMenu extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="home" icon={<HistoryOutlined />}>
                        <Link to="/home">
                            Home
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="user_account" icon={<SmileOutlined/>} >
                        <Link to="/user/account">
                            User Account
                        </Link>
                    </Menu.Item>

                    <Menu.Item key={"longin_signup"} icon={<FireFilled/>}>
                        <Link to={"/login"}>
                            Login/SignUp
                        </Link>
                    </Menu.Item>

                </Menu>
            </div>
        );
    }

}