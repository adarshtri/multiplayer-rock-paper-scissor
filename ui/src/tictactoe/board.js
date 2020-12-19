import React, {Component} from "react";
import Square from "./square";
import {Col, Row, Table, Tag} from "antd";
import "antd/dist/antd.css";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Cookies from "js-cookie";
import {getGame, updateGame} from "../api_calls/game";


export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "choice": "circle"
        }
        this.square_click_callback = this.square_click_callback.bind(this);
    }

    componentDidMount() {
        this.setState({gameid: this.props.match.params.gameid});
        this.interval = setInterval(()=>{
            getGame(this.state.gameid).then(data => {
                if(data["response_status"] === "OK"){
                    this.setState({gameProps: data,
                        choice: (data.data.gameDetails["cross"] === Cookies.get("username"))? "cross": "circle",
                        turn: (data.data.gameDetails.turn === Cookies.get("username"))
                    }, ()=>{


                    })
                }
            })
        }, 2000);
    }

    check_for_winner(moves){

        for(let i = 0; i<3; i++){

            if((moves[i][0] === moves[i][1] && moves[i][0] === moves[i][2]) && moves[i][0] !== ""){
                alert(moves[i][0] + " " + moves[i][1] + " " + moves[i][2])
                return moves[i][0];
            }

            if((moves[0][i] === moves[1][i] && moves[0][i] === moves[2][i]) && moves[0][i] !== ""){
                return moves[0][i];
            }
        }


        if((moves[0][0] === moves[1][1] && moves[0][0]=== moves[2][2]) && moves[0][0] !== "")
            return moves[0][0];
        else if((moves[2][0] === moves[1][1] && moves[2][0] === moves[0][2]) && moves[2][0] !== "")
            return moves[2][0];

        return null;
    }

    square_click_callback(location){
        let gameDetails = this.state.gameProps.data.gameDetails;
        let moves = gameDetails.moves;
        moves[location[0]][location[1]] = this.state.choice;
        gameDetails.moves = moves;

        const winner = this.check_for_winner(moves);

        if(winner){
            if(winner === "cross"){
                gameDetails.winner = this.state.gameProps.data.gameDetails.cross;
            }else{
                gameDetails.winner = this.state.gameProps.data.gameDetails.circle;
            }
        }

        if(this.state.choice === "cross"){
            gameDetails.turn = this.state.gameProps.data.gameDetails.circle;
        }else{
            gameDetails.turn = this.state.gameProps.data.gameDetails.cross;
        }

        updateGame({query: {"_id": this.state.gameid}, update: {gameDetails: gameDetails}}).then(data=>{
            if(data["response_status"] === "OK"){
                this.setState({gameProps: data,
                    choice: (data.data.gameDetails["cross"] === Cookies.get("username"))? "cross": "circle",
                    turn: (data.data.gameDetails.turn === Cookies.get("username"))
                }, ()=>{


                })
            }
        });
    }


    render() {

        let gameId = undefined;

        if(this.state.gameProps){
            if(this.state.gameProps.hasOwnProperty("data")){
                gameId = this.state.gameProps["data"]["_id"];
            }
        }

        return(
            <div>
                <Card style={{marginTop: "20px", marginBottom: "20px"}}>
                    <CardHeader title={"Game Details"}/>
                    <CardContent>
                        <Row style={{margin: "10px"}}>
                            <Col>
                                {this.state.gameProps && <Tag color={"red"}>{"GameID: " + this.state.gameProps["data"]["_id"]}</Tag>}
                            </Col>
                        </Row>
                        <Row style={{margin: "10px"}}>
                            <Col>
                                {this.state.gameProps && (this.state.gameProps.data.gameDetails.turn === Cookies.get("username")) ? <Tag color={"green"}>Your turn!</Tag> : <Tag color={"blue"}>Your opponent's turn!</Tag> }
                            </Col>
                        </Row>
                        <Row style={{margin: "10px"}}>
                            <Col>
                                {this.state.gameProps && (this.state.gameProps.data.gameDetails.cross === Cookies.get("username"))? <Tag color={"red"}>Your symbol: Cross</Tag>: <Tag color={"yellow"}>Your symbol: Circle</Tag> }
                            </Col>
                        </Row>

                        <Row style={{margin: "10px"}}>
                            <Col>
                                {this.state.gameProps &&
                                this.state.gameProps.data.gameDetails.winner &&
                                ((this.state.gameProps.data.gameDetails.winner === Cookies.get("username"))?<Tag color={"brown"}>You've won :)</Tag>:<Tag color={"brown"}>Your opponent has won :(</Tag>) }
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title={"TicTacToe"}/>
                    <CardContent style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}>
                        <div style={{
                            height: "150px",
                            width: "150px"
                        }}>
                            <Row>
                                <Col span={24}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[0, 0]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[0, 1]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice} turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[0, 2]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[1, 0]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[1, 1]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[1, 2]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[2, 0]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[2, 1]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                        <Col span={8} className="gutter-row">
                                            <Square location={[2, 2]}
                                                    location_callback={this.square_click_callback}
                                                    choice={this.state.choice}
                                                    turn={this.state.turn}
                                                    gameProps={this.state.gameProps}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}