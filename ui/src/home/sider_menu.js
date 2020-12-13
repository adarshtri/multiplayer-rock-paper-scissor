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

                    {/*<SubMenu*/}
                    {/*    key="sub1"*/}
                    {/*    title={*/}
                    {/*        <span>*/}
                    {/*                        <SettingOutlined />*/}
                    {/*                        <span>Build</span>*/}
                    {/*                        </span>*/}
                    {/*    }*/}
                    {/*>*/}

                    {/*    <Menu.Item key="build_menu_item" icon={<HistoryOutlined />}>*/}
                    {/*        <Link to="/build/history">*/}
                    {/*            History*/}
                    {/*        </Link>*/}
                    {/*    </Menu.Item>*/}


                    {/*    <Menu.Item key="build_health_item" icon={<SmileOutlined/>} >*/}
                    {/*        <Link to="/health/daily/overview">*/}
                    {/*            Health*/}
                    {/*        </Link>*/}
                    {/*    </Menu.Item>*/}


                    {/*</SubMenu>*/}

                    <Menu.Item key={"account"} icon={<FireFilled/>}>
                        <Link to={"/home"}>
                            Incidents
                        </Link>
                    </Menu.Item>

                </Menu>
            </div>
        );
    }

}