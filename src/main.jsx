import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from '../pages/home/index'
import TicTacToe from '../pages/games/tic_tac_toe/index'
import ErrorPage from '../pages/error/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    errorElement: < ErrorPage />,
    children: [
      {
        path: "InstitutoEvoluir.testWeb/",
        element: <Home />,
      },
      {
        path: "InstitutoEvoluir.testWeb/games",
        element: <TicTacToe />,
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
