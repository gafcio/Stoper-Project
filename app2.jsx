import React from 'react'
import ReactDOM from 'react-dom'

let players = [
    {
        name: 'Po prostu Gafcio',
        score: 66
    },
    {
        name: 'Moja kochana Spasia',
        score: 99
    },
    {
        name: 'Kwasia Pącz',
        score: 1000
    },
    {
        name: 'Turek czarny',
        score: 88
    }
]


class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="header">
          <h1>{this.props.title}</h1>
        </div>

        )
    }
}

class Player extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="player">
                <div className="player-name">
                    {this.props.name}
                </div>
                
                <div className="player-score">
                    <Counter score={this.props.score}/>
                </div>
            </div>
            
        )
    }
}

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    render(){
        return(
            <div className="counter">
                <button className="counter-action decrement" > - </button>
                <div className="counter-score">{this.props.score}</div>
                <button className="counter-action increment" > + </button>
            </div>
        )
    }
}

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title: "Scoreboard",
            players: this.props.listOfPlayers
        }

        Application.propTypes = {
            title: React.PropTypes.string
        }
    }


    render(){
        return(
        <div className="scoreboard">
            <Header title={this.props.title}/>
          
          <div className="players">
            {this.state.players.map((element, index)=>{
                return(
                    <Player key={index} name={element.name} score={element.score}/>
                )
            })}
            {/* <Player name={this.props.playerName1} score={this.props.score}/>
            <Player name={this.props.playerName2} score={4444}/> */}
          </div>
        </div> 
        )
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Application title="Tablica Wyników" listOfPlayers = {players} playerName1="GAFCIO" playerName2="Spasia"/>, 
        document.getElementById('container')
    );
});
