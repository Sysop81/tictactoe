import React, { Component } from 'react';
import Historical from './Historical.js';

export default class ModalHis extends Component {

  constructor(props) {
    super(props); 
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    document.getElementById('myModal').classList.remove('show')
  }

  render() {
    return (
        <div id="myModal" className="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{background:'#282c34a1',color:'white'}}>
              <h5 className="modal-title">Historial de movimientos</h5>
              <button type="button" onClick={this.closeModal} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Historical history={this.props.history} />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


