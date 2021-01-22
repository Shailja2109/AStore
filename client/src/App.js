import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logOutUser, setCurrentUser } from "./actions/authActions";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import adminLogin from "./components/auth/admin-login";
import adminRegister from "./components/auth/admin-register";
import Register from "./components/auth/Register";
import Category from "./components/category/Category";
import SubCategory from "./components/category/SubCategory";
import Products from "./components/products/ProductList";

//check token
if (localStorage.jwtToken) {
  //set auth token to header
  setAuthToken(localStorage.jwtToken);

  //decode token and get user
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  //Check token exprire
  const currentTime = Date.now / 1000;
  if (decoded.exp > currentTime) {
    //log out
    store.dispatch(logOutUser());

    //Redirect to log in
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {/* Admin routes */}
            <Route exact path="/admin/login" component={adminLogin} />
            <Route exact path="/admin/register" component={adminRegister} />

            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/Category/:id" component={Category} />
            <Route exact path="/subCategory/:id" component={SubCategory} />
            <Route exact path="/products/:id" component={Products} />
            <div className="container"></div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
