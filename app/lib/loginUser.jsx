import React from 'react'

const loginUser = async (email, password) => {

    const resp = await fetch(`https://academics.newtonschool.co/api/v1/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            projectID: 'ui0kptaykqqb',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            appType: 'linkedin'
        }) 
      })
    //   console.log("RESP RESP <",resp);
      if (!resp.ok) {
        console.log('Failed to fetch data')
      }

  return await resp.json()
}

export default loginUser