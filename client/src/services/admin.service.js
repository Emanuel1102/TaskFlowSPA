import { userEndpoint } from "./users.service"

const tasksEndPoint = 'http://localhost:3000/tasks'

export const getAllTasks = async () => {
    const response = await fetch(`${tasksEndPoint}?_embed=user`)
    
    const tasks = await response.json()
    
    return tasks
}

export const getUsers =  async () => {

    const response = await fetch(userEndpoint)
    
    const users = await response.json()
    
    return users

}