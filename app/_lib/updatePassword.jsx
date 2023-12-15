import React from 'react'

const updatePassword = async (userName, userEmail, currentPassword, newPassword, token ) => {

  // console.log("name is- ", userName, " email is- ", userEmail, " for updating the current password")
  // console.log("currentPassword is- ", currentPassword, " newPassword is- ", newPassword)

    const resp = await fetch(`https://academics.newtonschool.co/api/v1/user/updateMyPassword`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            passwordCurrent: currentPassword,
            password: newPassword,
            appType: 'linkedin'
        }) 
      })
    //   console.log("RESP RESP <",resp);
      if (!resp.ok) {
        console.log('Failed to update user password')
      }

  return await resp.json()
}

export default updatePassword