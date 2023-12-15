import React from 'react'

const composePost = async (title, textarea, imageFile, token) => {
    console.log("Title & Content of Post to be added :- ", title, " ", textarea)
    // console.log("hello ");
    
    const formData = new FormData();
    
    formData.append('title', title);
    
    formData.append('content', textarea);

    if (imageFile) {
      console.log(imageFile)
      formData.append('images', imageFile);
    }
    

    
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post`, {
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

export default composePost;