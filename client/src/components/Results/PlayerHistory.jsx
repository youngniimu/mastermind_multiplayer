import './css/results.css';

import React from 'react';
import { AreaChart, Area } from 'recharts';

const PlayerHistory = ({ size, gameHistory, color }) => {
  const data = gameHistory.map((unit) => ({
    uv: unit,
  }));

  return (
    <>
      <AreaChart width={size.width} height={size.height} data={data}>
        <Area type="monotone" dataKey="uv" stroke={color} fill={color} />
      </AreaChart>
    </>
  );
};

export default PlayerHistory;
