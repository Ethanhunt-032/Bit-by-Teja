
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesList from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import Layout from "./Layout";

export default function App() {

    const routes = [{
        path: '/',
        element: <Layout />,
        children: [{ path: '/', element: <HomePage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/articles', element: <ArticlesList /> },
        { path: '/articles/:name', element: <ArticlePage />  // /articles/UrlParameter
        }]
    }]


    const Router = createBrowserRouter(routes);

    return (
        <RouterProvider router={Router} />
    )
}
