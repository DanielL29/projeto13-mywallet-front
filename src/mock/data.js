const BASE_URL = 'https://projeto13-mywallet-backend-dan.herokuapp.com'

const config = (user) => {
    return {
        headers: {
            "Authorization": `bearer ${user.token}`
        }
    }
}

export { BASE_URL, config }