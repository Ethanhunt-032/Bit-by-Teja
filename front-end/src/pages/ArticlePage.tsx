import React from "react"
import articles from "../article-content"
import { useParams } from "react-router-dom"
export default function ArticlePage() {
    // const params = useParams();
    // const name  = params.name;
    const {name} = useParams();
    const article = articles.find(a => a.name == name)
    return (
        <div>
            <h1>{article?.title}</h1>
            {article?.content.map(para => <p key={para}> {para} </p>)}
        </div>
    )
}