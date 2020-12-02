import './css/results.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TabGroup from '../TabGroup/TabGroup';
import Code from '../Gameplay/Code';
import PlayerCard from './PlayerCard';
import Podium from './Podium';
import History from '../Gameplay/History';
import {
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
  changeName,
  changeRoom,
} from '../../actions';

const Results = ({
  playerList,
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
  socket,
  changeRoom,
  changeName,
  secretCode,
  gameHistory,
}) => {
  const [standings, setStandings] = useState([]);
  const [toLobby, setToLobby] = useState(false);
  const [toLanding, setToLanding] = useState(false);

  useEffect(() => {
    const newStandings = playerList.sort(
      (a, b) =>
        b.result.reduce((a, b) => a + b, 0) -
        a.result.reduce((a, b) => a + b, 0)
    );
    setStandings(newStandings);
  }, []);

  const leaveRoom = () => {
    setHeader(false);
    resetGameplay();
    toggleInGame();
    updatePlayerList([]);
    changeName('');
    changeRoom('');
    socket.emit('LEAVE_ROOM', socket.id);
    setToLanding(true);
  };

  const newGame = () => {
    resetGameplay();
    socket.emit('NEW_GAME', socket.id);
    setToLobby(true);
  };

  const renderContent = (type) => {
    if (type === 'standings') {
      return (
        <div>
          {standings.map((player) => (
            <PlayerCard player={player} />
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ transform: 'scale(1, -1)' }}>
          <History gameHistory={gameHistory} />
        </div>
      );
    }
  };

  return toLobby ? (
    <Redirect to="/game/lobby" />
  ) : toLanding ? (
    <Redirect to="/" />
  ) : (
    <div className="results-container">
      <div className="results-standings">
        <div style={{ margin: '5px' }}>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            Secret Code was:
          </div>
          <Code code={secretCode} />
        </div>
        <div style={{ textAlign: 'center', padding: '10px' }}>Standings:</div>
        <div>
          <Podium playerList={standings} />
        </div>
      </div>
      <div className="results-playerlist">
        <TabGroup
          types={['standings', 'history']}
          renderContent={renderContent}
        />
      </div>
      <div className="results-actions">
        <button
          onClick={leaveRoom}
          style={{ background: 'red', color: 'white' }}
        >
          leave room
        </button>
        <button
          onClick={newGame}
          style={{ background: 'green', color: 'white' }}
        >
          new game
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playerList: state.playerList,
    player: state.player,
    socket: state.socket,
    secretCode: state.gameplay.secretCode,
    gameHistory: state.gameplay.history,
  };
};

export default connect(mapStateToProps, {
  setHeader,
  updatePlayerList,
  toggleInGame,
  resetGameplay,
  changeName,
  changeRoom,
})(Results);
