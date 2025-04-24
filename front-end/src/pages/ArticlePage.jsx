import React from "react"
import articles from "../article-content"
import { useParams, useLoaderData } from "react-router-dom"
import { useState } from "react";
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentForm";
import axios from "axios";
import useUser from "../useUser";

export default function ArticlePage() {
    // const params = useParams();
    // const name  = params.name;
    const {name} = useParams();
    const {upvotes: initialUpvotes, comments: initialComments} = useLoaderData();
    const article = articles.find(a => a.name == name)

    const [ upvotes, setUpvotes ] = useState(initialUpvotes) ;
    const [ comments, setComments ] = useState(initialComments) ;

    const {isLoading ,user} = useUser();

    async function onUpvoteClicked() {
        //creating an Auth token to send to backend to make sure user is unique and valid
        const token = user && await user.getIdToken();      // Function provided bt firebase Auth
        const headers = token ? {authtoken : token} : {} ;


        const response = await axios.post('/api/articles/' + name + '/upvote', null, {headers}); // requestUrl , req Body, header
        const updatedArticleData= response.data ;
        setUpvotes(updatedArticleData.upvotes);
    }

    async function onAddComment({nameText, commentText}) {
        const token = user && await user.getIdToken();      // Function provided bt firebase Auth
        const headers = token ? {authtoken : token} : {} ;

        const response = await axios.post('/api/articles/' + name + '/comments', {
            postedBy : nameText,
            text: commentText,
        }, {headers});
        const updatedArticleData= response.data ;
        setComments(updatedArticleData.comments);
        // console.log("updated comments: " + updatedArticleData.comments)
    }

    return (
        <>
            <h1>{article?.title}</h1>
            {/* if user not loggedin user = null then button wont visible */}
            {user && <button onClick={onUpvoteClicked}>Upvote</button> }  
            <p> This article has {upvotes} upvotes</p>
            {article?.content.map(para => <p key={para}> {para} </p>)}
            {user ? <AddCommentForm onAddComment={onAddComment}/> : <p>Log In to add a comment</p> }
            <CommentsList comments={comments}/>
        </>
    )
}

export async function loader({params}){
    const response = await axios.get("/api/articles/" + params.name) ;
    const {upvotes, comments} = response.data;
    return {upvotes, comments} ;
}