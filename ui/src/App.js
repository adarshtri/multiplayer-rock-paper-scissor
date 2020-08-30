import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Board from "./tictactoe/board";


export default class App extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return(<Board/>)
  }

}
