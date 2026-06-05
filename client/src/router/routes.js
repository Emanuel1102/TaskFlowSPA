import { home } from "../views/home";
import { listenersLogin, login } from "../views/auth/login";
import { listenersRegister, register } from "../views/auth/register";
import { dashboard, listenersDashboard } from "../views/user/dashboard";
import { listenersNotFound, notFound } from "../views/auth/notFound";
import { taskForm, taskFormListeners } from "../views/tasks/taskForm";
import { listenersTasks, tasks } from "../views/tasks/tasks";
import { admin, listenersAdmin } from "../views/user/admin";
import { listenersProfile, profile } from "../views/user/profile";

export const routes = {
    // auth routes
    "/": {
        template: home,
        isPublic: true
    }, 
    "/login": {
        template: login,
        actions: listenersLogin,
        isPublic: true
    },
    "/register": {
        template: register,
        actions: listenersRegister,
        isPublic: true
    },

    // user routes
    "/dashboard": {
        template: dashboard,
        actions: listenersDashboard,
    },
    "/task-form": {
        template: taskForm,
        actions: taskFormListeners
    },
    "/tasks": {
        template: tasks,
        actions: listenersTasks
    },
    "/admin": {
        template: admin,
        actions: listenersAdmin,
        onlyAdmin: true
    },
    "/profile": {
        template: profile,
        actions: listenersProfile
    },
    
    // not found view
    "/not-found": {
        template: notFound,
        actions: listenersNotFound
    }
}