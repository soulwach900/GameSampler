import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home/index'
import TicTacToe from './pages/games/tic_tac_toe/index'
import ErrorPage from './pages/error/index'
import Login from "./pages/home/login/index.jsx";
import HomeGamesList from "./pages/games/index.jsx";
import ClickerGame from "./pages/games/clicker/index.jsx";
import './index.css'


const router = createBrowserRouter([
    {
        errorElement: < ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/games",
                element: <HomeGamesList/>,
            },
            {
                path: "/tictactoe",
                element: <TicTacToe/>,
            },
            {
                path: "/dogecoin_miner",
                element: <ClickerGame/>,
            }
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)
