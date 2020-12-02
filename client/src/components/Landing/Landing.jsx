import './css/landing.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  createSocket,
  setId,
  changeRoom,
  toggleInGame,
  updatePlayerList,
  setHeader,
  changeName,
} from '../../actions';
import TabGroup from '../TabGroup/TabGroup';
import PlayerForm from './PlayerForm';
import { useAddToHomescreenPrompt } from '../../service/useAddToHomeScreenPrompt';

const Landing = ({
  socket,
  history,
  createSocket,
  setId,
  player,
  changeRoom,
  toggleInGame,
  updatePlayerList,
  setHeader,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [installationVisible, setInstallationVisible] = useState(false);

  const hide = () => setInstallationVisible(false);

  useEffect(() => {
    createSocket();
  }, []);

  useEffect(() => {
    if (prompt) {
      setInstallationVisible(true);
    }
  }, [prompt]);

  const handleError = (errMessage) => {
    setErrorMessage(errMessage);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const verify = () => {
    if (!player.name) {
      handleError('enter UserName');
      return;
    }
    if (!player.room) {
      handleError('enter Room');
      return;
    }
    if (!socket.id) {
      handleError('Go online to play multiplayer');
      return;
    }
    socket.emit('VERIFY_ROOM', player, joinGame);
  };
  const joinGame = ({ player, isRoom, errMessage }) => {
    if (isRoom) {
      socket.emit('JOIN_GAME', { ...player, id: socket.id });
      toggleInGame();
      setHeader(true);
      history.push('/game/lobby');
    } else {
      handleError(errMessage);
    }
  };

  const createGame = () => {
    if (!socket.id) {
      handleError('Go online to play multiplayer');
      return;
    } else if (socket.id) {
      socket.emit('CREATE_GAME', { ...player, id: socket.id }, updatePlayer);
    } else {
      handleError('your socket is not ready');
    }
  };
  const updatePlayer = ({ room, playerList }) => {
    changeRoom(room);
    updatePlayerList(playerList);
    toggleInGame();
    setHeader(true);
    history.push('/game/lobby');
  };

  const renderContent = (types) => {
    if (types === 'Join Game') {
      return <PlayerForm title="Join Game" onClick={verify} />;
    } else {
      return <PlayerForm title="Create Game" onClick={createGame} />;
    }
  };

  return (
    <div>
      <div className="login-container">
        <TabGroup
          types={['Join Game', 'Create Game']}
          renderContent={renderContent}
        />
      </div>
      {errorMessage ? (
        <div className="landing-error">{errorMessage}</div>
      ) : null}
      {installationVisible ? (
        <div className="installationPrompt" onClick={promptToInstall}>
          +
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    player: state.player,
  };
};

export default connect(mapStateToProps, {
  createSocket,
  setId,
  changeRoom,
  toggleInGame,
  updatePlayerList,
  setHeader,
})(Landing);
