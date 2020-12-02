import React from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, ReferenceArea } from 'recharts';

const LeaderBoard = ({ players, size }) => {
  const data = players.map((player) => ({
    uv: player.result.reduce((a, b) => a + b, 0),
  }));

  const colors = players.map((player) => player.color);

  return (
    <>
      <BarChart width={size.width} height={size.height} data={data}>
        <Bar
          dataKey="uv"
          fill="#FF4500"
          animationEasing={'cubic-bezier(0.71,-0.1, 0.41, 1.21)'}
          animationDuration={700}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
        <XAxis dataKey="name" />
        <YAxis hide="true" domain={[0, 8]} />
        <ReferenceArea x1={0} x2={data} y1={7} y2={8} label={'VICTORY'} />
      </BarChart>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    size: ownProps.size,
    players: state.playerList,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
