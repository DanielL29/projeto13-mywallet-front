const BASE_URL = 'http://localhost:5000'

const config = (user) => {
    return {
        headers: {
            "Authorization": `bearer ${user.token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }
}

export { BASE_URL, config }