import React from 'react'

const getLocation = async () => {
 const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_9HF1NzUhh9YYPpy4q2jc150lVHkg0&ipAddress=8.8.8.8')

 return response.json()
 
}

export default getLocation;