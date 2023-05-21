import React from 'react';
import './Styles.css';
import Game from './Game.js';


class Login extends React.Component{

  constructor(props) {
    super(props); 
    this.state = {
      p1: '',
      p2: '',
      isGoToPlay:false 
    }
    this.goToPlay = this.goToPlay.bind(this);
    this.setPlayer = this.setPlayer.bind(this);

  }

  setPlayer(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  goToPlay(e){
    e.preventDefault();
    this.setState({
      isGoToPlay: true,
      p1: this.state.p1 === '' ? 'Player_1' : this.state.p1,
      p2: this.state.p2 === '' ? 'Player_2' : this.state.p2,
    });
    
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className={"d-flex justify-content-center " + (this.state.isGoToPlay ? '': 'align-items-center height-div-login')}>
            {this.state.isGoToPlay ? (
              <Game player1={this.state.p1} player2={this.state.p2} />
            ):(
              <form>
                <input type="text" name="p1"  defaultValue={this.state.p1} onChange={this.setPlayer} className="form-control mb-3" placeholder="Player 1"/>
                <input type="text" name="p2"  defaultValue={this.state.p2} onChange={this.setPlayer} className="form-control mb-3" placeholder="Player 2"/>
                <button onClick={this.goToPlay} className="btn btn-primary btn-max-width">Jugar</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
