import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./js/components/App.js";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import setAuthToken from "./js/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./js/actions/index";
import { Provider } from "react-redux";
import reducers from "./js/reducers";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "./login";
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
    		<App />
		</BrowserRouter>
	</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
