import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";
import "../../css/App.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProductList from "./Products/ProductList";

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const [page, setPage] = useState(-1);
  const [fetched, setFetched] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  let toRender;

  useEffect(
    () => {
      if (fetched) {
        return;
      }
      dispatch(actions.fetchProducts());
      setFetched(true);
    },
    [fetched, dispatch]
  );

  switch (page) {
    case 0:
      toRender = <Homepage />;
      break;
    case 1:
      toRender = <Register />;
      break;
    case 2:
      toRender = <Login />;
      break;
    case 3:
      toRender = <ProductList />;
      break;
    default:
      toRender = <div>No Page</div>;
  }

  return (
    <div className="App">
      <Centered>
        <button onClick={e => setPage(0)}>Homepage</button>
        <button onClick={e => setPage(1)}>Register</button>
        <button onClick={e => setPage(2)}>Login</button>
        <button onClick={e => setPage(3)}>Products</button>
      </Centered>
      <Centered>Product Length: {products.length}</Centered>
      {toRender}
    </div>
  );
}

export default App;
