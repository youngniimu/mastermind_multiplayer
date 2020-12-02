import './css/landing.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeName, changeRoom } from '../../actions';

const PlayerForm = (props) => {
  const [timer, setTimer] = useState(30);

  const changeTimer = () => {
    setTimer(
      timer === 30 ? 45 : timer === 45 ? 60 : 30
    );
  };

  const inputBoxStyle = {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '10px',
    border: '2px solid white',
    marginTop: '2px',
  };

  return (
    <div>
      <div>
        <input
          style={inputBoxStyle}
          placeholder="username"
          maxLength="6"
          onChange={(e) => props.changeName(e.target.value)}
        />
      </div>
      {props.title === 'Create Game' ? (
        <div className="game-rules">
          <div style={{ ...inputBoxStyle }}>
            <p>Game Rules:</p>
            <span>
              RoundTime:
              <button onClick={changeTimer}>{timer}</button>
            </span>
          </div>
        </div>
      ) : (
        <div>
          <input
            style={inputBoxStyle}
            placeholder="room"
            maxLength="4"
            inputMode="numeric"
            onChange={(e) => props.changeRoom(e.target.value)}
          />
        </div>
      )}
      <button style={inputBoxStyle} type="submit" onClick={props.onClick}>
        {props.title}
      </button>
    </div>
  );
};

export default connect(null, { changeName, changeRoom })(PlayerForm);
