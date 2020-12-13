import React, {Component} from "react";
import GameSelect from "./gameselect";
import {Redirect} from "react-router";
import {CardContent, CardHeader, Card, CardActionArea} from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import {Button} from "antd";



export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            playGameClicked: false
        }

        this.setGame = this.setGame.bind(this);
        this.playGameClick = this.playGameClick.bind(this);
    }

    setGame(game){
        this.setState({game: game});
    }

    playGameClick(e){

        this.setState({playGameClicked: true}, ()=>{

            if(this.state.game === null){
                alert("Please select a game.")
            }else if(this.state.game === "tictactoe"){
                this.setState({game: "tictactoe"});
            }

        })


    }

    render() {

        const gameValue = this.state.game;

        if (gameValue === "tictactoe" && this.state.playGameClicked){
            return(<Redirect to={"/game/tictactoe"}/>)
        }

        return (
            <div className={"center"} style={{margin: "10px"}}>
                <Card>
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
            </div>
        );
    }

}