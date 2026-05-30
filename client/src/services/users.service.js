const userEndpoint =  'http://localhost:3000/users'

export const createUser = async (user) =>{
    await fetch(userEndpoint, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export const verifyUser = async (email, password=null) => {
    const url = password ? `${userEndpoint}?email=${email}&password=${password}` : `${userEndpoint}?email=${email}`    
    const response = await fetch(url)
    const [ user ] = await response.json()
    return user
}

export const updateUser = async (id, user) => {
    await fetch(`${userEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export const deleteUser = async (id) => {
    await fetch(`${userEndpoint}/${id}`, {
        method: 'DELETE'
    })
}
