import React from 'react'

const postComment = async (input, postId, token) => {
    console.log("Commnent for adding to post is :- ", input)

    const formDataa = new FormData();
    formDataa.append('content', input)
    console.log("formDataa ", formDataa);

    const requestBody = JSON.stringify({
      "content": input,
    });
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        },
        body: requestBody,
        redirect: 'follow'
            
      })

      if (!resp.ok) {
        console.log("Comment added to post or not ? ", resp)
        // throw new Error(`Failed to upVote Post:- ${resp.status}`)
      }

  return await resp.json()
}

export default postComment;