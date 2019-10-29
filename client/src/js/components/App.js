import React, { useState } from 'react';
import '../../css/App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Homepage from './Homepage/Homepage';
import Register from './Register/Register';
import Login from './Login/Login';
import styled from 'styled-components';

const Centered = styled.div`
  display: flex;
  justify-content: center;
`

function App() {
  const [ page, setPage ] = useState(-1)
  let toRender

  switch (page) {
    case 0:
      toRender = <Homepage />
      break
    case 1:
      toRender = <Register />
      break
    case 2:
      toRender = <Login />
      break
    default:
      toRender = <div>No Page</div>
  }

  return (
    <div className="App">
      <Centered>
        <button onClick={e => setPage(0)}>Homepage</button>
        <button onClick={e => setPage(1)}>Register</button>
        <button onClick={e => setPage(2)}>Login</button>
      </Centered>
      {toRender}
    </div>
  );
}

export default App;
