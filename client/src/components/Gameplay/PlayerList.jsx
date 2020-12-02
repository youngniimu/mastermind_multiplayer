import React from 'react'

const PlayerList = (props) => {
	return (
		<>
        {props.players.map((player) =>
          player.inGame ? (
            <div
              className="gameplay-player-tag"
              style={{ background: `${player.color}` }}
            ></div>
          ) : null
        )}
      </>
	)
}

export default PlayerList