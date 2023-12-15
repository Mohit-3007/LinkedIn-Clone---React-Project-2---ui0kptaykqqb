import React from 'react'

const creatingGroup = async (title, description, imageFile, token) => {
    console.log("Title & Content of Group to be added :- ", title, " ", description)
    
    const formData = new FormData(); 
    formData.append('name', title);  
    formData.append('content', description);
    if (imageFile) {
      console.log(imageFile)
      formData.append('images', imageFile);
    }
       
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'ui0kptaykqqb',
        },
        body: formData       
      })
      if (!resp.ok) {
        console.log("Comment added post ? ", resp)
        // throw new Error(`Failed to upVote Post:- ${resp.status}`)
      }
  return await resp.json()
}
export default creatingGroup