import React from 'react'
    

const getComments = async (postId, token) => {

    // console.log("postId for fetching comments ", postId)
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${postId}/comments`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to fetch commnets data')
      }

  return await resp.json()
}

export default getComments;