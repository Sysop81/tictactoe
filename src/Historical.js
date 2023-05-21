import React, { Component } from 'react';

export default class Historical extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <>
        <div className='col-12 text-center mb-3'>
          <h4 className='badge bg-dark'>Historial de partidas</h4>
        </div>

        <div className='col-12 d-flex justify-content-center mb-2'>
          <table className='table'>
            <thead>
              <tr>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Movimientos</th>
                <th>Ganador</th>
              </tr>
            </thead>
            <tbody>
            {this.props.history.length === 0 ? (
               <tr><td colSpan={4} className='text-center'>Sin datos registrados</td></tr> 
            ):(
              this.props.history.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.p1}</td>
                    <td>{val.p2}</td>
                    <td>{val.move}</td>
                    <td>{val.win}</td>
                  </tr>
                )
              })
            )}  
            
            </tbody>
          </table>
        </div>
      </>
    );
  }
}