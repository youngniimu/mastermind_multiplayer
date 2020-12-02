import './css/TabGroup.css';

import React, { useState } from 'react';


const TabGroup = (props) => {
  const [active, setActive] = useState(props.types[0]);

  return (
    <div className="tab-container">
      <div className="buttongroup">
        {props.types.map((type) => (
          <button
            className={type === active ? 'tab' : 'active-tab'}
            key={type}
            onClick={() => setActive(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="tab-content">{props.renderContent(active)}</div>
    </div>
  );
};

export default TabGroup;
