import React, {useState} from 'react';
import './index.css';

import FactionList from './app/features/factions/FactionList'
import Search from './app/features/search/Search';



function App() {


  return (
    <div className="flex justify-center flex-wrap gap-11">
      <Search />
      <FactionList />
      
    </div>
  );

}

export default App;
