import React from 'react'

const unfollowUser = async (userId, token) => {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/follow/${userId}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to Unfollow user')
      }

  return await resp.json()
}

export default unfollowUser;