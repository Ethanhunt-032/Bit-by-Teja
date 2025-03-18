import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ArticlesList from "./pages/ArticlesList.jsx";
import ArticlePage from "./pages/ArticlePage.js";
import Layout from "./Layout.jsx";

function App() {

  const routes =[{
      path : '/',
      element : <Layout/>,
      children: [{ path: '/', element: <HomePage/> },
      { path: '/about', element: <AboutPage/> },{path: '/articles', element: <ArticlesList/>},
      { path: '/articles/individual', element: <ArticlePage/>}  ]
  }]

  const router = createBrowserRouter(routes);

  return (
      <>
          <RouterProvider router={router}/>
      </>
  )
}

export default App
