const session = 'user-active'

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
