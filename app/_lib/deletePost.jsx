import React from 'react'

const deletePost = async (postId, token) => {

    console.log("postId ", postId );
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      console.log(resp);

      if (!resp.ok) {
        console.log(resp);
        console.log('Failed to Delete the Post')
      }

  return await resp
}

export default deletePost;