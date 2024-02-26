import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import { StoreContext, store } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    {/* App got access to Store */}
    {/* <App />  */}
    {/* We are using the App component in the Router so instead of App we can use RouterProvider */}
    <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode>,
)
