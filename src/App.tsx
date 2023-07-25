import { RouterProvider } from 'react-router-dom'
import './App.css'
import Routes from '@/router/routes'
import { FC, useEffect } from 'react'

function App() {
  // useEffect(() => {
  //   console.log('vite------')
  // },[])
  return <RouterProvider router={Routes} />
}

export default App
