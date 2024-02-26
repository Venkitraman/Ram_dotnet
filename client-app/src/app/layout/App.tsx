import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation(); //This will get the location or pathname 

  return (
    <>
    {/* This checks if the location.path = / than it will display home page not the navbar and other else displays all */}
      {location.pathname === '/' ? <HomePage /> :
        <>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            {/* <ActivityDashboard /> */}
            <Outlet />
            {/* When we load outlet these get swapped with the actual component that we need there */}
            {/* eg: When we go to activities the outlet loads the ActivityDashboard */}
          </Container>
        </>
      }
    </>
  )
}

export default observer(App);
