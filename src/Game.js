import React, { Component } from 'react';
import Info from './Info.js';
import ModalHis from './ModalHis.js';

export default class Game extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      historical: [],
      tableCells : [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ],
      isTurnOfP2: false,
      cpuMode: this.props.player2 == 'cpu' ? true : false, // Next version
      movements: 9,
      winner:{
        finish: false,
        player: '',
        isTie: false,
        loser: ''
      }
    }

    this.createBoard = this.createBoard.bind(this);
    this.markCell = this.markCell.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.saveHistorical = this.saveHistorical.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal(){
      document.getElementById('myModal').classList.add('show');  
  }


  createBoard(){
    const table = this.state.tableCells;
    let rows = [];

    for(let i = 0; i < table.length; i++){
      let cols = table[i];
      let tds = [];
      for(let x = 0; x < cols.length; x++){
        tds.push(<td key={`${i}-${x}`} id={`${i}-${x}`} onClick={this.markCell} className='td-board-game'>{this.state.tableCells[i][x]}</td>)
      }
      rows.push(<tr key={i} id={i}>{tds}</tr>);
    }

    return rows;

  }

  getMove(){
    
    const move = this.state.isTurnOfP2 ? 'o':'x';
    this.setState({
      isTurnOfP2: !this.state.isTurnOfP2
    });

    return move
  }

  markCell(e){
    if(this.state.movements > 0 && !this.state.winner.finish){
      
      const aId = e.target.id.split('-');
      const board = this.state.tableCells;

      board[aId[0]][aId[1]] = board[aId[0]][aId[1]] === null ?  this.getMove() : board[aId[0]][aId[1]];

      document.getElementById(e.target.id).setAttribute('style', (this.state.isTurnOfP2 ? 'color:#0d6efd':'color:orange'));

      this.setState({
        tableCells: board,
        movements: this.state.movements - 1
      })

      this.evaluateGame(this.state.tableCells, !this.state.isTurnOfP2);
    }
    
  }

  evaluateGame(board,turnOfP2){

    let isWinner = false;
    let whereIsWhinner = null;
    const playerEval = !turnOfP2 ? 'o' : 'x';

    //Player 1 && 2 HORIZONTAL
    if(board[0][0] == playerEval && board[0][1] == playerEval && board[0][2] == playerEval || 
       board[1][0] == playerEval && board[1][1] == playerEval && board[1][2] == playerEval ||
       board[2][0] == playerEval && board[2][1] == playerEval && board[2][2] == playerEval ){

        whereIsWhinner = 'h';
        isWinner= true;
    }

    //Player 1 && 2 VERTICAL
    if(board[0][0] == playerEval && board[1][0] == playerEval && board[2][0] == playerEval || 
       board[0][1] == playerEval && board[1][1] == playerEval && board[2][1] == playerEval ||
       board[0][2] == playerEval && board[1][2] == playerEval && board[2][2] == playerEval ){

        whereIsWhinner = 'v';
        isWinner= true;
    }

    //Player 1 && 2 DIAGONAL
    if(board[0][0] == playerEval && board[1][1] == playerEval && board[2][2] == playerEval || 
       board[0][2] == playerEval && board[1][1] == playerEval && board[2][0] == playerEval ){

        whereIsWhinner = 'd';
        isWinner= true;
      } 


    if(isWinner){
      this.setState({
        winner:{
          finish: true,
          player: playerEval == 'o' ? this.props.player2: this.props.player1,
          isTie: false,
          loser: playerEval == 'o' ? this.props.player1: this.props.player2
        }
      },()=>this.saveHistorical())
    }
    
    if(!isWinner && this.state.movements === 1){
      this.setState({
        winner:{
          finish: true,
          player: '',
          isTie: true,
          loser: ''
        }
        
      },()=>this.saveHistorical());
     
    }       

  }

  saveHistorical(){

    let his = this.state.historical;
    let winner = this.state.winner;
    const TOTAL_MOVES = 9;
    
    if(winner.finish){
      let newResult = {
        p1: this.props.player1,
        p2: this.props.player2,
        move: TOTAL_MOVES - this.state.movements,
        win: winner.player != '' ? winner.player : 'EMPATE'
      }

      his.push(newResult);
      
      this.setState({
        historical: his
      })

    }
    
  }


  resetGame(){
    this.setState({
      tableCells : [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ],
      isTurnOfP2: false,
      movements: 9,
      winner:{
        finish: false,
        player: ''
      }
    })

  }

  render() {
    return (
      <div className="row">
        <ModalHis history={this.state.historical} />
        <div className='col-12 text-center mb-3 header'>
          <h4>TIC TAC TOE </h4>
        </div>

        <div className='col-6 d-flex justify-content-center'>
           <p className={"badge " + (!this.state.isTurnOfP2 ? 'bg-success': 'bg-secondary') }><b>{(!this.state.isTurnOfP2 ? '[Jugando] ': '')}</b>{this.props.player1}</p> 
        </div>
        <div className='col-6 d-flex justify-content-center'>
           <p className={"badge " + (this.state.isTurnOfP2 ? 'bg-success': 'bg-secondary')}><b>{(this.state.isTurnOfP2 ? '[Jugando] ': '')}</b>{this.props.player2}</p> 
        </div>

        <div className='col-12 d-flex justify-content-center mb-2'>
          <table className='table table-bordered'>
            <tbody>
              {this.createBoard()}
            </tbody>
          </table>
        </div>
        <Info winner={this.state.winner} />
        <div className='col-12 d-flex mb-2'>
          <button onClick={this.resetGame} className="btn btn-primary ">Jugar otra vez !!</button>
          <button onClick={this.showModal} className="btn btn-warning ms-2">Ver Historial</button>
          <button onClick={()=>window.location.reload()} className="btn btn-danger ms-2">Salir</button>
        </div>
      </div>
    );
  }
}