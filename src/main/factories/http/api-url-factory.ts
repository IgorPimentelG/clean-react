type URLs = {
  login: string
}

const makeApiUrl = (): URLs => {
  return {
    login: 'http://fordevs.herokuapp.com/api/login'
  }
}

export { makeApiUrl }
