import React, {useState} from 'react';
import './index.css';

import FactionList from './app/features/factions/FactionList'
import Search from './app/features/search/Search';



function App() {


  return (
    <div className="flex justify-center flex-wrap gap-11">
      <Search />
      <FactionList />
      {/* Overlay and expanded content */}
      {/* expandedBlock && (
        <div className="overlay" onClick={closeExpandedBlock}>
          <div className="expanded-content">
            <div className="close-button" onClick={closeExpandedBlock}>
              X
            </div>
            <div className="faction-name">{factionsData.find((faction) => faction["corporation_id"] === expandedBlock).name}</div>
            <div className="faction-description">
              {factionsData.find((faction) => faction.id === expandedBlock).description}
            </div>
            <div className="solar-system">
              {factionsData.find((faction) => faction.id === expandedBlock).solarSystem}
            </div>
          </div>
        </div>
      ) */} 
    </div>
  );

}

export default App;
