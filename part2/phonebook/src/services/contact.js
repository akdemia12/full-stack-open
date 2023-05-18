import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const clean = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(console.log('This contact was deleted'));
}

const post = personObject => {
  const request = axios.post(`${baseUrl}`, personObject)
  return request.then(console.log('This contact was posted'))
}

const get = () => {
  const request = axios.get(`${baseUrl}`)
  return request
}

const update = (object, newNum) => {
  const request =  axios.put(`${baseUrl}/${object.id}`, {
    ...object, num: newNum
  })
  return request
}



export default { 
 clean,
 post,
 get,
 update
}