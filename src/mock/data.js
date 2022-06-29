const BASE_URL = 'http://localhost:5000'

const config = (user) => {
    return {
        headers: {
            "Authorization": `bearer ${user.token}`
        }
    }
}

export { BASE_URL, config }