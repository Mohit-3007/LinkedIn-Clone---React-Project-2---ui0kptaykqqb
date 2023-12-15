import React from 'react'

const getPosts = async ({limit, page}) => {

    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?limit=${limit}&page=${page}`, {
      cache: 'no-cache',
        headers: {
            projectID: 'ui0kptaykqqb',
        }     
      })
    
      if (!resp.ok) {
        console.log('Failed to fetch posts data and response is ', resp)
      }

  return await resp.json()
}

export default getPosts;