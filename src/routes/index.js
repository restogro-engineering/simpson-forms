/** @format */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import PrivateRoute from './private-route';
import NotFound from '../components/not-found';
import Register from '../components/resgister';
import Dashboard from '../components/dashboard';
import Setup from '../components/setup';

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/form/:mode/:form' element={<Setup />} />
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
