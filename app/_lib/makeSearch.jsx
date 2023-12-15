import React from 'react'

const makeSearch = async (input, type) => {
    console.log(`search term is ${input} and type is ${type}`)

    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post?search={"${type}":"${input}"}`, {
            cache: 'no-cache',
            headers: {
                projectID: 'ui0kptaykqqb',
            },
            redirect: 'follow'     
        })
      //   console.log("RESP RESP <",resp);
        if (!resp.ok) {
          console.log(`Failed to search ${type}`)
        }
  
    return await resp.json()
}

export default makeSearch;