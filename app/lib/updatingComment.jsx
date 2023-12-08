import React from 'react'

const updatingComment = async (input, commentId, token) => {
    console.log("Commnent for adding to post is :- ", input)

    const requestBody = JSON.stringify({
      "content": input,
    });
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${commentId}`, {
        method: 'PATCH',
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

export default updatingComment