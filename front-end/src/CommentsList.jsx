export default function CommentsList({comments}){
    return(
        <>
        <h3>Comments: </h3>
        {
            comments.map(comment => (     // () → implicit return
                <div key={comment.text}>
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.text}</p>
                </div>
            ))
        }
        </>
    )
    // return(
    //     comments.map(comment => {        // {} → explicit return
    //     return (
    //         <div key={comment.text}>
    //             <h4>{comment.postedBy}</h4>
    //             <p>{comment.text}</p>
    //         </div>
    //         );
    //     })
    // )
    
}