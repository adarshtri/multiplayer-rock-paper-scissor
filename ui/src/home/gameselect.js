import React, {Component} from "react";
import { Radio } from 'antd';


export default class GameSelect extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: null
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({
            value: e.target.value,
        }, ()=>{
            this.props.gameChangeCallback(this.state.value);
        });
    };

    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }

        const value  = this.state.value;

        return (
            <div>
                <Radio.Group onChange={this.onChange} value={value}>
                    <Radio style={radioStyle} value={"tictactoe"}>
                        TicTacToe
                    </Radio>
                </Radio.Group>
            </div>
        );
    }


}