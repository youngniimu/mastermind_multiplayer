import React from 'react';

const Code = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      {props.code.map((code, index) => (
        <div
          className="code"
          onClick={
            props.toggleCode
              ? () => props.toggleCode(index, props.code, props.notes)
              : null
          }
        >
          {code}
        </div>
      ))}
    </div>
  );
};

export default Code;
