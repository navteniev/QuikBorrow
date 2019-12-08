import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../../css/App.css";
import 'typeface-roboto';
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductList from "./Products/ProductList";
import Navbar from './Navbar/Navbar';
import ProductDetail from './Products/ProductDetail';
import Profile from "./Profile/Profile";
import 'typeface-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components'
import teal from '@material-ui/core/colors/teal'
import cyan from '@material-ui/core/colors/cyan'
import PageContent from './utils/PageContent'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700]
    },
    secondary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700]
    }
  }
})

const Content = styled.div`
  margin-top: 64px;
  padding-top: 60px;
`

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Content>
            <Route exact path="/" component={Homepage} />
            <PageContent>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/products/:productId" component={ProductDetail} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile/:profileId" component={Profile} />
            </PageContent>
          </Content>
          </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
