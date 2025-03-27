import React from "react"
import articles from "../article-content"
import ArticlesList from "../ArticlesList"

export default function ArticlesListPage() {
    return (
        <>
            <h1>Articles of the Day</h1>
            <ArticlesList articles={articles}/>
        </>
    )
}