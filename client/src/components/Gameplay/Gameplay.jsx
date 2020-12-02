import './css/gameplay.css';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  setGameplay,
  addHistory,
  updatePlayerList,
  setSecretCode,
} from '../../actions';
import PlayerList from './PlayerList';
import History from './History';
import Notes from './Notes';
import Code from './Code.jsx';
import SwipeableButton from '../SwipeableButton/SwipeableButton';

const Gameplay = ({
  socket,
  myCode,
  myNotes,
  gameHistory,
  players,
  setGameplay,
  addHistory,
  setSecretCode,
}) => {
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState(myCode);
  const [notes, setNotes] = useState(myNotes);
  const [timer, setTimer] = useState(30);
  const [toLobby, setToLobby] = useState(false);
  const [toResults, setToResults] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [timer]);

  if (socket) {
    socket.on('GAME_WON', (secretCode) => {
      setSecretCode(secretCode);
      setToResults(true);
    });
  }

  const toggleNote = (id) => {
    if (notes.filter((note) => note).length > 1) {
      setNotes(notes.map((note, index) => (index === id ? !note : note)));
    } else {
      setNotes(Array(8).fill(true));
    }
  };

  const toggleCode = (id, code, notes) => {
    let newValue = code[id] !== 8 ? code[id] + 1 : 1;
    while (!notes[newValue - 1]) {
      newValue = newValue !== 8 ? newValue + 1 : 1;
    }
    setCode(code.map((c, index) => (index === id ? newValue : c)));
  };

  const submitCode = (code, socket) => {
    setGameplay({ notes, code });
    socket.emit('SUBMIT_CODE', { code, id: socket.id }, updateHistory);
    setToLobby(true);
  };

  const updateHistory = (result) => {
    addHistory({
      round: gameHistory.length,
      code,
      result,
    });
  };

  if ((success || timer === -1) && !toLobby) {
    submitCode(code, socket);
  }

  return toLobby ? (
    <Redirect to="/game/lobby" />
  ) : toResults ? (
    <Redirect to="/game/results" />
  ) : (
    <div className="gameplay-container">
      <div className="gameplay-players-container">
        <PlayerList players={players} />
      </div>
      <div className="gameplay-history-container">
        <History gameHistory={gameHistory} />
      </div>
      <div className="gameplay-code-container">
        <div style={{ textAlign: 'center', fontSize: '20px', padding: '5px' }}>
          {timer}
        </div>
        <Notes toggleNote={toggleNote} notes={notes} />
        <Code code={code} notes={notes} toggleCode={toggleCode} />
        <SwipeableButton
          onSuccess={() => setSuccess(true)}
          placeholder="submit"
          text="submitted"
          code={code}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    socket: state.socket,
    myCode: state.gameplay.code,
    myNotes: state.gameplay.notes,
    players: state.playerList,
    gameHistory: state.gameplay.history,
  };
};

export default connect(mapStateToProps, {
  setGameplay,
  addHistory,
  updatePlayerList,
  setSecretCode,
})(Gameplay);
