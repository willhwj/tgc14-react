import React from 'react'
// only import the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"; 

import MovieList from './MovieList';

function App() {
  return (
   <div class="container">
     <MovieList/>
   </div>
  );
}

export default App;
