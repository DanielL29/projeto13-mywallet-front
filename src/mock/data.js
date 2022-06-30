const BASE_URL = 'https://projeto13-mywallet-backend-dan.herokuapp.com'

const config = (user) => {
    return {
        headers: {
            "Authorization": `bearer ${user.token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }
}

export { BASE_URL, config }