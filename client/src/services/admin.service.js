import { userEndpoint } from "./users.service"

const tasksEndPoint = 'http://localhost:3000/tasks'

// this function consult and return all tasks
export const getAllTasks = async () => {
    const response = await fetch(`${tasksEndPoint}?_embed=user`)
    
    const tasks = await response.json()
    
    return tasks
}

// this function consult and return all users
export const getUsers =  async () => {

    const response = await fetch(userEndpoint)
    
    const users = await response.json()
    
    return users

}