import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from './Redux/store.ts'
import { PrivateRoute,PublicRoute } from "./middleware/AuthMiddleware.tsx";


import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomeAll from './components/Homeall.tsx';
import Login from './components/Login.tsx';
import Home from './components/Home.tsx';
import Register from './components/Register.tsx';
import Search from './components/Search.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />} >
      <Route index element={<PublicRoute><HomeAll /></PublicRoute>} />
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
      <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
