import React, { useState, useEffect } from "react";

function CommentSection(props) {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    function fetchComments() {
        // Make an API call to your backend to retrieve comments for the current video
        // For example:
        // fetch(`https://your-backend.com/comments/${props.videoId}`)
        //   .then(response => response.json())
        //   .then(data => setComments(data));
        // You'll need to replace this with your own API endpoint

        // For now, let's just use some dummy comments
        setComments([
            {
                id: 1,
                username: "JohnDoe",
                text: "This video is great!"
            },
            {
                id: 2,
                username: "JaneSmith",
                text: "I didn't like this video very much"
            }
        ]);
    }

    function handleNewCommentTextChange(event) {
        setNewCommentText(event.target.value);
    }

    function handleNewCommentSubmit(event) {
        event.preventDefault();
        // Make an API call to your backend to save the new comment for the current video
        // For example:
        // fetch(`https://your-backend.com/comments/${props.videoId}`, {
        //   method: "POST",
        //   body: JSON.stringify({ text: newCommentText }),
        //   headers: { "Content-Type": "application/json" }
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     setComments([...comments, data]);
        //     setNewCommentText("");
        //   });
        // You'll need to replace this with your own API endpoint

        // For now, let's just add the new comment to our local state
        const newComment = {
            id: comments.length + 1,
            username: "Guest",
            text: newCommentText
        };
        setComments([...comments, newComment]);
        setNewCommentText("");
    }

    function handleLoginClick() {
        // Make an API call to your backend to check if the user is logged in
        // For example:
        // fetch(`https://your-backend.com/check-login`)
        //   .then(response => response.json())
        //   .then(data => setLoggedIn(data.isLoggedIn));
        // You'll need to replace this with your own API endpoint

        // For now, let's assume the user is logged in if they click the login button
        setLoggedIn(false);
    }

    return (
        <div>
            <h2>Comments</h2>
            {loggedIn ? (
                <form onSubmit={handleNewCommentSubmit}>
                    <label>
                        New comment:
                        <input
                            type="text"
                            value={newCommentText}
                            onChange={handleNewCommentTextChange}
                        />
                    </label>
                    <button type="submit">Post</button>
                </form>
            ) : (
                <button onClick={handleLoginClick}>Log in to post a comment</button>
            )}
            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>{comment.username}:</strong> {comment.text}
                </div>
            ))}
        </div>
    );
}

export default CommentSection;
