const tasksEndPoint = 'http://localhost:3000/tasks'

export const getAllTasks = async () => {
    const response = await fetch(`${tasksEndPoint}?_embed=user`)
    
    const tasks = await response.json()
    
    return tasks
}