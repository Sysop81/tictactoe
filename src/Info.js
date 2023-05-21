import React, { Component } from 'react';

export default class Info extends Component {

  constructor(props) {
    super(props); 

  }

  render() {
    return (
        <div className={'col-12 ' + (this.props.winner.finish? 'd-block': 'd-none')}>
          <div className={"alert alert-primary mb-2 " +  (!this.props.winner.isTie? 'd-block': 'd-none')} role="alert">
            Ganador <b>{this.props.winner.player}</b>
          </div>
          <div className={"alert alert-warning mb-2 " +  (this.props.winner.isTie? 'd-block': 'd-none')} role="alert">
            EMPATADOS
          </div>
        </div>      
    );
  }
}