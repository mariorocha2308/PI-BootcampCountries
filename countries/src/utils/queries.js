const URL_DEPLOY = process.env.REACT_APP_DEPLOY

//* COUNTRY

export const getCountriesQuery = () => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/country/all`)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(result => {
      console.log(result)
      return resolve(result)
    })
    .catch(() => reject('Failed to get countries'))
  })
}

export const searchCountriesQuery = (name) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/country${'/all?name=' + name}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to search countries'))
  })
}

export const getCountryQuery = (id) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/country/${id}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to get a country') )
  })
}

export const sortCountriesQuery = (queryParams) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/country/sortbar?${queryParams.join('&')}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to sort countries'))
  })
}

export const listActivitiesQuery = (id) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/country/list/activities/${id}`)
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(() => reject('Failed to get list activities'))
  })
}

//* ACIVITY

export const deleteActivityQuery = (id) => {
  
  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/activity/delete/${id}`,{
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(() => resolve(id))
    .catch(() => reject('Failed to delete activity'))
  })
}

export const postActivityQuery = (input) => {

  return new Promise((resolve, reject) => {
    fetch(`${URL_DEPLOY}/activity/create`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        reject(result.error)
        return;
      }
      resolve(result)
    })
    .catch(() => reject('Failed to post activity'))
  })
}
