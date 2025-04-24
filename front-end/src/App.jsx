
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import './App.css' ;
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage, {loader as articleLoader} from "./pages/ArticlePage";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";

export default function App() {

    const routes = [{
        path: '/',
        element: <Layout />,
        errorElement : <NotFoundPage/>,
        children: [{ path: '/', element: <HomePage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/articles', element: <ArticlesListPage /> },    
        { path: '/articles/:name', element: <ArticlePage/> , loader : articleLoader } ,// /articles/UrlParameter
        { path: '/login', element: <LoginPage /> },
        { path: '/create-account', element: <CreateAccountPage /> },
        ]
    }]


    const Router = createBrowserRouter(routes);

    return (
        <RouterProvider router={Router} />
    )
}
