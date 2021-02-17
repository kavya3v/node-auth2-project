import {Route,Link, Switch} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Contacts from './Contacts';
import Users from './Users';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Survival of the fittest!</h1> 
      </header>
      <nav className="myNav" >
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Switch>
      <Route path="/register">
        <Register/>
      </Route>

      <Route path="/login">
        <Login/>
      </Route>

      <Route path="/contact">
        <Contacts/>
      </Route>

      <Route path="/:id/users">
        <Users/>
      </Route>

      </Switch>
    </div>
  );
}

export default App;
