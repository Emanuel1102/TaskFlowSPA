// key to handle the localStorage 
const session = 'user-active'
/* 
    theese functions allow handle the user session:
    save when the user is authenticated
    get when we need verify some data from the user
    and remove when the user logout
*/
export const saveSession = (user) => {
    localStorage.setItem(session, JSON.stringify(user))
}

export const getSession = () => {
    const sessionActive = localStorage.getItem(session)
    return sessionActive ? JSON.parse(sessionActive) : null
}

export const removeSession = () => {
    localStorage.removeItem(session)
}
