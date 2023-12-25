import React from 'react'

const fetchSinglePost = async (id, token) => {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${id}`, {
        cache: 'no-cache',
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
          }     
        })
      
        if (!resp.ok) {
          console.log('Failed to fetch particular posts data and response is ', resp)
        }
    
      return await resp.json()
}

export default fetchSinglePost