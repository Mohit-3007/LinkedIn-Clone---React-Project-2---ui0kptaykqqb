import React from 'react'

const signUpUser = async (name, email, password) => {
  const resp = await fetch(`https://academics.newtonschool.co/api/v1/user/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      projectID: 'ui0kptaykqqb',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      appType: 'linkedin'
    }) 
  })
  if (!resp.ok) {
    console.log('Failed to Sign Up user');
    console.log(resp);
  }
  return await resp.json()
}

export default signUpUser