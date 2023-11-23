import React from 'react'

const getComments = async (postId) => {

    console.log("postId for fetching comments ", postId)
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${postId}/comments`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM5MjFhNGIyOTJlNWRlMmVmMGRhNCIsImlhdCI6MTcwMDY1NTYwNywiZXhwIjoxNzMyMTkxNjA3fQ.UDOahWEw-Ajf9vjSfSwBRogs5oRzBRXKG3y7rRh7xdw',
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to fetch commnets data')
      }

  return await resp.json()
}

export default getComments;