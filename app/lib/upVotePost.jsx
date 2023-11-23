
import React from 'react'

const upVotePost = async (postId) => {
    console.log("postId for upVoting Post ", postId)
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${postId}`, {
        next: { revalidate: 10 },
        method: 'POST',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM5MjFhNGIyOTJlNWRlMmVmMGRhNCIsImlhdCI6MTcwMDY3NDc4MiwiZXhwIjoxNzMyMjEwNzgyfQ.BfORTzVwDaYJvWKgF7VBuaL_Sp_Bd1gTopvL_8QgCq8',
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log("UPVOTE ", resp)

      }

  return await resp.json()
}

export default upVotePost;