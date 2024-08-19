import React from 'react';
import Autocomplete from './Autocomplete';

const App = () => {
  const suggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];

  return (
    <div>
      <h1>Autocomplete</h1>
      <Autocomplete suggestions={suggestions} />
    </div>
  );
};

export default App;
