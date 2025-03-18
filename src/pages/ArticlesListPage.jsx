import React from "react"
import articles from "../article-content"
import ArticlesList from "../ArticlesList"

export default function ArticlesList() {
    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles}/>
        </>
    )
}