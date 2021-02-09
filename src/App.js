import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './component/nipponheader/Header';
import Footer from "./component/nipponfooter/Footer";
import Home from "./component/kycmanagement/Home";
import Print_Options from "./component/kycmanagement/Print_Options";
import Print_Details from './component/kycmanagement/Print_Details';
import Certificate from './component/kycmanagement/Certificate';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <div id="main">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/print_options" component={Print_Options}></Route>
          <Route exact path="/print_details" component={Print_Details}></Route>
          <Route exact path= "/certificate" component={Certificate}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
  }
}


export default App;
