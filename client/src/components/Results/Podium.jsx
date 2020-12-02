import './css/results.css';

import React from 'react';
import first from '../../img/first.png';
import second from '../../img/second.png';
import third from '../../img/third.png';

// const winner = {
//   position: 'relative',
//   left: '-5%',
//   color: 'black',
//   fontSize: '10px',
//   background: 'gold',
//   border: '4px solid yellow',
//   padding: '3px',
//   borderRadius: '30%',
// };

// const second = {
//   position: 'relative',
//   left: '-5%',
//   color: 'black',
//   fontSize: '8px',
//   background: 'gray',
//   border: '3px solid lightgray',
//   padding: '2px',
//   borderRadius: '30%',
// };

// const third = {
//   position: 'relative',
//   left: '-5%',
//   color: 'white',
//   fontSize: '6px',
//   background: 'bronze',
//   border: '3px solid lightgray',
//   padding: '2px',
//   borderRadius: '30%',
// };

const Podium = ({ playerList }) => {
  return (
    <div className="podium-container">
      {playerList.map((player, index) => (
        <div className="podium-unit" style={{ background: player.color }}>
          {index === 0 ? (
            <img src={first} alt="first" style={{ width: '50px', height: '50px', background: player.color }} />
          ) : index === 1 ? (
            <img src={second} alt="second" style={{ width: '40px', height: '40px', background: player.color }} />
          ) : index === 2 ? (
            <img src={third} alt="third" style={{ width: '30px', height: '30px', background: player.color }} />
          ) : null}
          {player.name}{' '}
        </div>
      ))}
    </div>
  );
};

export default Podium;
