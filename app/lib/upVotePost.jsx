import React from 'react'

const upVotePost = async (postId, token) => {
    console.log("postId for upVoting Post ", postId)
    console.log("token", token)
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${postId}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log("UPVOTE ", resp)

      }


  return await resp.json()
}

export default upVotePost;