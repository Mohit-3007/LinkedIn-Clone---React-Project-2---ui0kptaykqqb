import React from 'react'

const getUser = async (userId, token) => {
  
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${userId}`, {
        cache: 'no-cache',
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

export default getUser