const config = (user) => {
    return {
        headers: {
            "Authorization": `bearer ${user.token}`
        }
    }
}

export { config }