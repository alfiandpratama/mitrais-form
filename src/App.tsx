import React from 'react';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className='app'>
      {/* Register Form Component */}
      <Register />

      {/* Footer */}
      <div className='app-footer'>Footer</div>
    </div>
  );
}

export default App;
