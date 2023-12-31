import '../App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './StudentHome';
import AdminHome from './AdminHome';
import ShowSchedule from './ShowSchedule';

function Home() {
  return (
    <div className="Home">
      <h2>Registration Service</h2>
        <BrowserRouter>
          <div>
            <Link to="/">Student</Link>{' '}
            &nbsp;|&nbsp;&nbsp;
            <Link to="/admin" id="AddStudent">Admin</Link>{' '}
            <Switch>
              <Route exact path="/" component={StudentHome} />
              <Route path="/schedule" component={ShowSchedule} />
              <Route path="/admin" component={AdminHome} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}


export default Home;