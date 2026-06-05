export const userEndpoint =  'http://localhost:3000/users'

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
