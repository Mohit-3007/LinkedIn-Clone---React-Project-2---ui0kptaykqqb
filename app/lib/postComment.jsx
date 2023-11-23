import React from 'react'

const postComment = async (input, postId) => {
    console.log("Commnent for adding to post is :- ", input)
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM5MjFhNGIyOTJlNWRlMmVmMGRhNCIsImlhdCI6MTcwMDY2MTcwNSwiZXhwIjoxNzMyMTk3NzA1fQ.QSgIquO-xvlKA3gE6VC99ui7pdp5gPN6IG09-IVATjM',
            projectID: 'ui0kptaykqqb',
        },
        body: JSON.stringify({
            content: input
        })     
      })

      if (!resp.ok) {
        console.log("Comment added post ? ", resp)
        // throw new Error(`Failed to upVote Post:- ${resp.status}`)
      }

  return await resp.json()
}

export default postComment;