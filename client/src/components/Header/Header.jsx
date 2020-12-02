import './css/header.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  toggleHeader,
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
} from '../../actions';
import Modal from '../Modal/Modal';

const Header = ({
  player,
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
  socket,
}) => {
  const { header } = player; //"toggleheader" attribute is in player object
  const [activeModal, setActiveModal] = useState(false);

  const leaveRoom = () => {
    setHeader(false);
    setActiveModal(!activeModal);
    resetGameplay();
    toggleInGame();
    updatePlayerList([]);
    socket.emit('LEAVE_ROOM', socket.id);
  };

  const modalActions = (
    <>
      <Link to="/" onClick={leaveRoom} className="modal-button-leave">
        leave
      </Link>
      <button
        onClick={() => setActiveModal(!activeModal)}
        className="modal-button-cancel"
      >
        cancel
      </button>
    </>
  );

  return (
    <div className={`header-${header}`}>
      <button className={`header-logo`}>
        <sup style={{ background: 'white', color: 'black' }}>C</sup>
      </button>
      {!player.inGame ? null : (
        <>
          <div className={`header-room-${header}`}>room:{player.room}</div>
          <div
            className={`header-exit-${header}`}
            onClick={() => setActiveModal(!activeModal)}
          >
            EXIT
          </div>
        </>
      )}
      {activeModal ? (
        <Modal
          modalContent="Do you wish to leave the room?"
          modalActions={modalActions}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    socket: state.socket,
  };
};

export default connect(mapStateToProps, {
  toggleHeader,
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
})(Header);
