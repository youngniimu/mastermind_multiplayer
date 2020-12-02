import React from 'react';

const colors = ['white', '#ff6b6b', '#1dd1a1'];

const History = (props) => {
  return (
    <div className="history-container">
      {props.gameHistory.map((unit) => (
        <div className="history-unit">
          <div className="history-unit-round">{unit.round + 1}</div>
          <div className="history-unit-code">{unit.code}</div>
          <div className="history-unit-result">
            {unit.result.map((result) => (
              <div
                style={{
                  background: `${colors[result]}`,
                  borderRadius: '5px',
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
