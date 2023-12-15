import React from 'react'
import { revalidatePath } from 'next/cache'

const followUser = async (userId, token) => {
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/follow/${userId}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to follow user')
      }

  return await resp.json()
}

export default followUser;