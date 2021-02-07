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
import Install_certificate from "./component/kycmanagement/Install_certificate";

function App() {
  return (
    <div id="main">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/install_certificate" component={Install_certificate}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}


export default App;
