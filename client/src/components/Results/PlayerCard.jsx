import './css/results.css';

import React from 'react';
import useDimensions from 'react-use-dimensions';

import PlayerHistory from './PlayerHistory';

const PlayerCard = ({ player }) => {
  const [ref, size] = useDimensions();

  return (
    <div className="playercard-container">
      <div className="playercard-title">{player.name}</div>
      <div className="playercard-history" ref={ref}>
        <PlayerHistory
          size={size}
          gameHistory={player.history}
          color={player.color}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
