import React from 'react'
import ReactDOM from 'react-dom'

var resultTable = [];

let players = [
    {
        id:0,
        name: 'Jacek',
        score: resultTable[0]
    },
    {   id:1,
        name: 'Ola',
        score: resultTable[1]
    },
    {
        id:2,
        name: 'Człowiek ziemniak',
        score: resultTable[2]
    },
    {
        id:3,
        name: 'Turek czarny',
        score: resultTable[3]
    }
]

class Score extends React.Component{

}

class StopWatch extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            running: false,
            time: 0,
            seconds: 0,
            miliseconds: 0,
            minutes: 0,
            microseconds: 0,
            result: []
        }
        this.value =0;
    }

    componentWillUpdate(){
       // console.log('WillUpdate', this.state.running)
        
        if(this.state.running===false){
            //console.log('WillUpdate w środku', this.state.running)
            this.interval = setInterval(this.onTick, 10);
        }
    }
    

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    onTick = () => {
         
        this.setState({

           
            miliseconds: this.state.miliseconds + 1,
            microseconds: this.state.microseconds + 10,
           
        });

        if(this.state.microseconds === 1000){
            this.setState({
                microseconds: 0,
                seconds: this.state.seconds + 1,
            })
        }
        if(this.state.seconds===60){
            this.setState({
                seconds: 0,
                minutes: this.state.minutes+1
            })
        }
    }
    
    onStop = () => {
        this.setState({
            running: false,
        })
        clearInterval(this.interval)
        var data = [this.state.seconds, this.state.microseconds];
        this.state.result.push(data);
        resultTable.push(data);
        this.value ++;

        if(this.value === 4)
            this.value=0;
        this.setState({
            result: this.state.result
        })
        console.log(this.state.result)
        //console.log('Stop guzik', this.state.running)

        this.props.whenStopped(this.state.result)
    }

    onStart = () => {
        this.setState({
            running: true
        })
        //console.log('Start guzik', this.state.running)
    }
    
    onReset = () => {
        
        clearInterval(this.interval)
        this.setState({
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            microseconds: 0,
            running: false
            
        })
    }

    render(){
        var starstop;
        console.log("Stan w render", this.state.running)
        if(this.state.running){
            starstop = <button onClick={this.onStop}>Stop</button>
        }

        else{
            starstop = <button onClick={this.onStart}>Start</button>
        }

        return(
            <div className="stopwatch">
                <h2>Stoper</h2>
                <div className="stopwatch-time">{Math.floor(this.state.minutes)}.{Math.floor(this.state.seconds)}.{(this.state.microseconds)}</div>
                {starstop}
                <button onClick={this.onReset}>Reset</button>
            </div>
        )
    }
}

class AddPLayers extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: ''
        }

    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onAdd(this.state.name);
        this.setState({
            name: ''
        })
    }

    onNameChange = (e) =>{
        console.log('Funcka pobierajaca formualrz',e.target.value);
        this.setState({
            name: e.target.value
        })
    }

    render(){
        return(
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                    <input type="submit" value="Add PLayer"/>
                </form>
            </div>
        )
    }
}

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="header">
          <h1>{this.props.title}</h1>
          <StopWatch whenStopped={this.props.whenStopped} />
        </div>

        )
    }
}

class Player extends React.Component{
    constructor(props){
        super(props);
    }
    whatTheFuck =() => {
        console.log('No siema',this.props.order)
    }
    render(){
        this.whatTheFuck();
        return(
            <div className="player">
                <div className="player-name">
                    <a className="remove-player" onClick={this.props.onRemove}>X</a>
                    {this.props.name}
                </div>
                
                <div className="player-score">
                    <Counter initialScore={this.props.order} />
                </div>
            </div>
            
        )
    }
}

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            score: this.props.initialScore //this.props.initialScore,
        }
    }
    
    incrementButton = (e) =>{
        console.log(this.props.index);
        // this.state.score + 1;
        this.setState({
            score: this.state.score[0 + 1] 
        })
    }

    decrementButton = () => {
        this.setState({
            score: this.state.score -1  
        })
    }
    componentDidUpdate(){

    }
    
    render(){
        console.log("dupa",this.state.score)
        return(
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementButton}> - </button>
                <div className="counter-score">{this.state.score}</div>
                <button className="counter-action increment" onClick={this.incrementButton}> + </button>
            </div>
        )
    }
}

class Application extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            players: this.props.listOfPlayers,
            result: []
        }

        Application.propTypes = {
            title: React.PropTypes.string
        }
    }

    onPlayerAdd = (name) => {
        console.log('dodano nowego gracza' + name);
        this.state.players.push({
            name: name,
            score: 0,

        })
        this.setState({
            players: this.state.players
        })
        
    }

    onRemovePlayer = (id) =>{
        console.log('Usuwamy zawodnika o numerze' + id);
        this.state.players.splice(id, 1);
        this.setState({
            players: this.state.players
        })
    }
    makeShitDone = (param) =>{
        console.log("is it done?",param)

    }
    render(){
        return(
        <div className="scoreboard">
            <Header whenStopped={this.makeShitDone} title={this.props.title}/>
          
          <div className="players">
            {this.state.players.map((element, index)=>{
                return(
                    <Player
                     key={index}
                     order={index} 
                     id={element.id}
                     name={element.name} 
                     score={element.score}
                     onRemove={() => {this.onRemovePlayer(index)}}/>
                     
                )
            })}
            {/* <Player name={this.props.playerName1} score={this.props.score}/>
            <Player name={this.props.playerName2} score={4444}/> */}
          </div>
          <AddPLayers onAdd={this.onPlayerAdd} />
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
