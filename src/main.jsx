import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto'; 
import '@fontsource/inter';
import FirstDepositModalReset from './reusable_component/FirstDepositModalReset';
import { SocketProvider } from "./shared/socket/SocketContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstDepositModalReset />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)'
    }}
    />
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={Router} />
      </SocketProvider>
    </Provider>
  </StrictMode>
);