import './css/lobby.css'

import React from 'react';
import TabGroup from '../TabGroup/TabGroup';

const Info = () => {

  const renderContent = (types) => {
    if (types === 'Rules') {
      return (
				<>
					<h1>Game Rules:</h1>
					<p>Code Lenght: 4</p>
					<p>Numbers: 1-8</p>
					<p>Round Time: 30sec</p>
				</>
			);
    } else {
      return (
			<>
				<h1>How to play:</h1>
				<p>main goal is to try to guess the 4 digit code before your rivals.</p>
				<p>each number is randomly generated between 1-8</p>
				<p>green peg = right number, right position</p>
				<p>red peg = right number, wrong position</p>
				<p>no peg = wrong number</p>
			</>
			);
    }
  };

	return (
		<TabGroup 
		types={['Rules', 'How to Play']}
		renderContent={renderContent}/>
	)
};


export default Info;
