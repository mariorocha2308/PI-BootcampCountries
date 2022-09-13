const URL_DEPLOY = process.env.REACT_APP_DEPLOY

export const deleteActivityQuery = (id) => {
  
  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/delete/activity/${id}`,{
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(() => resolve(id))
    .catch(() => reject('Failed to delete activity'))
  })
}

export const postActivityQuery = (input) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/activity`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to post activity'))
  })

}

export const getCountriesQuery = () => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/countries`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to get countries'))
  })
}

export const getCountryQuery = (id) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/countries/${id}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to get a country') )
  })
}

export const searchCountriesQuery = (name) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/countries${'?name=' + name}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to search countries'))
  })
}

export const sortCountriesQuery = (queryParams) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/countries/sortbar?${queryParams.join('&')}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to sort countries'))
  })
}