import React from 'react'

const getUser = async (userId, token) => {

  console.log("userId),",userId)
  console.log("token),",token)
  
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${userId}`, {
        cache: 'no-cache',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to fetch User data')
      }

  return await resp.json()
}

export default getUser