import React, { useState } from 'react';

const Notes = (props) => {
  return (
    <div style={{display: 'flex'}}>
      {props.notes.map((note, index) => (
        <div
          className={`note-${note}`}
          id="note"
          onClick={() => props.toggleNote(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Notes;
