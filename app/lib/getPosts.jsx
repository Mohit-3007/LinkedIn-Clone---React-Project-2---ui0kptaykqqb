import React from 'react'

const getPosts = async ({limit=20, page=1}) => {

    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?limit=${limit}&page=${page}`, {
      cache: 'no-cache',
        headers: {
            projectID: 'ui0kptaykqqb',
        }     
      })
    //   console.log("RESP RESP <",resp);
      if (!resp.ok) {
        console.log('Failed to fetch posts data')
      }

  return await resp.json()
}

export default getPosts;