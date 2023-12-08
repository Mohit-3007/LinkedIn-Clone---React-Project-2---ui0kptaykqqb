import React from 'react'

const deleteGroup = async (groupId, token) => {

    console.log("groupId ", groupId );
  
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${groupId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        }     
      })

      if (!resp.ok) {
        console.log('Failed to Delete the Group')
      }

  return await resp.json()
}

export default deleteGroup;