// endpoint to requests
const tasksEndpoint =  'http://localhost:3000/tasks'

// this function allows create a new task
export const createTask = async (task) =>{
    await fetch(tasksEndpoint, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(task)
    })
}

// this function allows update a task
export const updateTask = async (id, task) => {
    await fetch(`${tasksEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(task)
    })
}

// this function allows delete a task
export const deleteTask = async (id) => {
    await fetch(`${tasksEndpoint}/${id}`, {
        method: 'DELETE'
    })
}

// with this function we can get all tasks from an user
export const getTasks = async (idUser) => {
    const response = await fetch(`${tasksEndpoint}?userId=${idUser}`)

    const tasks = await response.json()

    return tasks
    
}

