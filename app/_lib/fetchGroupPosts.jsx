import React from 'react'

const fetchGroupPosts = async(id, token) => {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${id}/posts`, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: 'ui0kptaykqqb',
        }
        })
      if (!resp.ok) {
        console.log("Group Data fetch failed :-  ", resp)
      }
      return await resp.json()
}

export default fetchGroupPosts