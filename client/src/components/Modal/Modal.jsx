import './css/modal.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
} from '../../actions';

const Modal = ({
  dismiss,
  modalContent,
  modalActions,
}) => {

  return ReactDOM.createPortal(
    <div onClick={dismiss} className="modal-dimmer">
      <div onClick={(e) => e.stopPropagation()} className="modal-container">
        <div className="modal-content">{modalContent}</div>
        <div className="modal-actions">
          {modalActions}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
  };
};

export default connect(mapStateToProps, {
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
})(Modal);
