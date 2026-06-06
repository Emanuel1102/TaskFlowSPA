export const userEndpoint =  'http://localhost:3000/users'

// this function allows create a new user
export const createUser = async (user) =>{
    await fetch(userEndpoint, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
}

// with this function we can verify if an user exists, by email and password, or only by email
export const verifyUser = async (email, password=null) => {
    const url = password ? `${userEndpoint}?email=${email}&password=${password}` : `${userEndpoint}?email=${email}`    
    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error('Error al verificar el usuario')
        }

        const [ user ] = await response.json()

        if (!user) {
            return null
        }

        return user
        
    } catch (error) {

        alert(`Error al verificar el usuario: ${error.message}`)
        
    }
}

// this function allows update an user
export const updateUser = async (id, user) => {
    await fetch(`${userEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
}

// this function allows delete an user
export const deleteUser = async (id) => {
    await fetch(`${userEndpoint}/${id}`, {
        method: 'DELETE'
    })
}
