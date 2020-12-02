import './css/lobby.css';

import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import useDimensions from 'react-use-dimensions';
import { Redirect } from 'react-router-dom';

import SwipeableButton from '../SwipeableButton/SwipeableButton';
import Info from './Info';
import LeaderBoard from './Leaderboard';
import Modal from '../Modal/Modal';
import {
  updatePlayerList,
  createSocket,
  toggleReady,
  setSecretCode,
} from '../../actions';

const Lobby = ({
  socket,
  playerList,
  gameHistory,
  updatePlayerList,
  setSecretCode,
  toggleReady,
  player,
}) => {
  const lobbyRef = useRef(null);
  const [, updateState] = useState();
  const [success, setSuccess] = useState(false);
  const [ref, size] = useDimensions();
  const [activeModal, setActiveModal] = useState(false);
  const [toGameplay, setToGameplay] = useState(false);
  const [toResults, setToResults] = useState(false);

  if (socket) {
    socket.on('PLAYER_LIST', (playerList) => {
      updatePlayerList(playerList);
    });
    socket.on('START_ROUND', () => {
      setToGameplay(true);
    });
    socket.on('GAME_WON', (secretCode) => {
      setSecretCode(secretCode);
      setToResults(true);
    });
  }

  const cancelButton = () => {
    setActiveModal(false);
    lobbyRef.current.reset();
  };

  const modalActions = (
    <>
      <button
        onClick={() => socket.emit('READY', socket.id)}
        className="modal-button-enter"
      >
        start
      </button>
      <button onClick={cancelButton} className="modal-button-cancel">
        cancel
      </button>
    </>
  );

  if (success) {
    {
      playerList.length === 1 && gameHistory.length === 0
        ? setActiveModal(!activeModal)
        : socket.emit('READY', socket.id);
    }
    setSuccess(false);
  }

  return toGameplay ? (
    <Redirect to="/game/gameplay" />
  ) : toResults ? (
    <Redirect to="/game/results" />
  ) : (
    <div className="lobby-container">
      <div className="lobby-info" ref={ref}>
        {gameHistory.length === 0 ? <Info /> : <LeaderBoard size={size} />}
      </div>
      <div className="lobby-players">
        <div style={{ textAlign: 'center' }}>players:</div>
        <div className="lobby-players-content">
          {playerList.map((player) =>
            player.inGame ? (
              <div id="player-tag" className="player-tag-inGame">
                <div className="player-tag-inGame">{player.name}</div>
                <div className="player-tag-inGame" style={{ fontSize: '8px' }}>
                  inGame
                </div>
              </div>
            ) : (
              <div
                className={
                  player.ready ? 'player-tag-ready' : 'player-tag-notready'
                }
                id="player-tag"
                style={{ background: `${player.color}` }}
              >
                {player.wins !== 0 ? (
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '10px',
                      background: 'yellow',
                    }}
                  >
                    {player.wins}
                  </div>
                ) : null}
                <div style={{ background: player.color }}>{player.name}</div>
              </div>
            )
          )}
        </div>
        <div style={{ margin: '10px' }}>
          <SwipeableButton
            ref={lobbyRef}
            onSuccess={() => setSuccess(true)}
            placeholder="swipe"
            text="ready"
          />
        </div>
      </div>
      {activeModal ? (
        <Modal
          dismiss={() => setActiveModal(!activeModal)}
          modalContent="Do you want to play alone?"
          modalActions={modalActions}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    playerList: state.playerList,
    player: state.player,
    gameHistory: state.gameplay.history,
  };
};

export default connect(mapStateToProps, {
  updatePlayerList,
  createSocket,
  toggleReady,
  setSecretCode,
})(Lobby);
