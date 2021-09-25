import React, { useState } from 'react';

import LeftCol from './Components/Columns/LeftCol';

import Cards from './Components/Cards/Cards';
import Details from './Components/Cards/Details';
import RightCol from './Components/Columns/RightCol';

const App = () => {
  const [pokemon, setPokemon] = useState({});

  const showDetailsHandler = data => {
    setPokemon(data);
  }

  return (
    <div className="container">
      <LeftCol>
        <h1 className="heading">Pokedex</h1>
        <Cards onShowDetails={showDetailsHandler} />
      </LeftCol>
      <RightCol>
        { Object.keys(pokemon).length !== 0 && <Details pokemon={pokemon} /> }
      </RightCol>
    </div>
  );
}

export default App;
