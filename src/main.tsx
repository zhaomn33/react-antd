import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import { RouterProvider } from 'react-router-dom'
// import './App.css'
// import Routes from '@/router/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={Routes} /> */}
  </React.StrictMode>
)
