import React, {Component} from "react";
import GameSelect from "./gameselect";
import {Redirect} from "react-router";
import {CardContent, CardHeader, Card, CardActionArea} from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import {Button, Col, Input, Row} from "antd";
import {createGame, getGame, updateGame} from "../api_calls/game";
import Cookies from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";



export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            joinedGame: null,
            playGameClicked: false,
            joinGameClicked: false,
            error_snackbar_show: false,
            gameProps: null,
            error_snackbar_message: "",
            join_id_input_value: undefined
        }

        this.setGame = this.setGame.bind(this);
        this.playGameClick = this.playGameClick.bind(this);
        this.id_input_change_handler = this.id_input_change_handler.bind(this);
        this.join_game_clicked = this.join_game_clicked.bind(this);
        this.handleErrorSnackBarClose = this.handleErrorSnackBarClose.bind(this);
        this.handleTicTacToeJoinGame = this.handleTicTacToeJoinGame.bind(this);
    }

    setGame(game){
        this.setState({game: game});
    }

    handleTicTacToeJoinGame(data){
        if(data["response_status"] === "OK"){
            this.setState({joinedGame: data["data"]["gameType"]}, ()=>{
                if(!data["data"]["players"].includes(Cookies.get("username"))){

                    let players = data["data"]["players"];
                    players.push(Cookies.get("username"));

                    let gameDetails = data["data"]["gameDetails"];
                    gameDetails["circle"] = Cookies.get("username");

                    updateGame(
                        {
                            "query": {
                                "_id": data["data"]["_id"]
                            },
                            "update": {
                                "players": players,
                                "gameDetails": gameDetails
                            }
                        }
                    ).then(updateData => {
                        if(updateData["response_status"] === "OK"){
                            this.setState({gameProps: updateData});
                        }else{
                            this.setState({error_snackbar_message: data["response"]}, ()=>{
                                this.setState({error_snackbar_show: true})
                            })
                        }
                    })

                }else{
                    this.setState({joinedGame: data["data"]["gameType"]}, ()=>{
                        this.setState({gameProps: data});
                    })
                }

            });
        }else{
            this.setState({error_snackbar_message: data["response"]}, ()=>{
                this.setState({error_snackbar_show: true})
            })
        }
    }

    playGameClick(e){

        this.setState({playGameClicked: true}, ()=>{

            if(this.state.game === null){
                alert("Please select a game.")
            }else if(this.state.game === "tictactoe"){
                createGame({gameType: "tictactoe",
                    players: [Cookies.get("username")],
                    gameDetails: {cross: Cookies.get("username")}}).then(data=>{
                    if(data["response_status"] === "OK"){
                        this.setState({gameProps: data});
                    }else{
                        this.setState({error_snackbar_message: data["response"]}, ()=>{
                            this.setState({error_snackbar_show: true})
                        })
                    }
                })
                this.setState({game: "tictactoe"});
            }
        })
    }

    id_input_change_handler(event){
        this.setState({join_id_input_value: event.target.value});
    }

    join_game_clicked(event){
        this.setState({joinGameClicked: true}, ()=>{
            getGame(this.state.join_id_input_value).then(data => {
                this.handleTicTacToeJoinGame(data);
            })
        })
    }

    handleErrorSnackBarClose(event, reason){
        this.setState({error_snackbar_show: false}, ()=>{
            this.setState({error_snackbar_message: undefined});
        });
    }

    render() {

        const gameValue = this.state.game;
        const joinedGame = this.state.joinedGame;

        if (gameValue === "tictactoe" && this.state.playGameClicked && this.state.gameProps){
            return(<Redirect to={{pathname: "/game/tictactoe/"+this.state.gameProps["data"]["_id"], state: this.state.gameProps, choice: "cross"}}/>)
        }

        if (joinedGame === "tictactoe" && this.state.joinGameClicked && this.state.gameProps){
            return(<Redirect to={{pathname: "/game/tictactoe/"+this.state.gameProps["data"]["_id"], state: this.state.gameProps,
                choice: ((this.state.gameProps.data["gameDetails"]["cross"] === Cookies.get("username"))? "cross": "circle")}}/>)
        }

        return (
            <div className={"center"} style={{margin: "10px"}}>

                <Snackbar anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                          open={this.state.error_snackbar_show} autoHideDuration={5000} onClose={this.handleErrorSnackBarClose}
                          message={this.state.error_snackbar_message}/>

                <Card style={{marginBottom: "10px"}}>
                    <CardHeader title={"Choose the game to play?"}/>
                    <CardContent>
                        <GameSelect gameChangeCallback={this.setGame}/>
                    </CardContent>
                    <CardActionArea>
                        <CardActions>
                            <div className="center">
                                <Button type={"primary"} onClick={this.playGameClick}>Play</Button>
                            </div>
                        </CardActions>
                    </CardActionArea>
                </Card>
                <Card>
                    <CardHeader title={"Join an existing game."}/>
                    <CardContent>
                        <Input style={{marginBlock: "20px"}} onChange={this.id_input_change_handler} placeholder={"Enter the game id"}/>
                    </CardContent>
                    <CardActionArea>
                        <CardActions>
                            <Button type={"primary"} onClick={this.join_game_clicked}>Join Game</Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </div>
        );
    }

}