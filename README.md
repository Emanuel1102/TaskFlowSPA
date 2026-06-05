
# TaskFlowSPA
## 📖 Description:
This project is developed to understand modern web development by implementing a robust SPA architecture using Vanilla JavaScript, Tailwind CSS, and a simulated database using JSON Server.

The application is a task management platform with authentication system 

### 🔐 Key Features:
- **tasks and users CRUD:** Normal users can create, view, edit, and delete their own tasks and account.
- **Access Control:** Restriction of views and routes based on authentication status and user role (if the user is normal User or Administrator).
- **Administration Panel:** The administrator user has access to a global panel to manage (full CRUD) all users and all tasks in the system.

## 📂 Project Structure:

- **`/client`**: Contains the user interface **(HTML, CSS and JavaScript)**
- **`/api`**: Contains the backend, simulating the database using **json-server**.

```bash
.
├── api
│   ├── data
│   │   └── db.json
├── client
│   ├── public
│   ├── src
│   │   ├── router
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── views
│   │   └── main.js
│   ├── index.html
│   └── vite.config.ts
├── LICENSE
└── README.md

```

## 🛠️ Technologies Used:

- **Client:** HTML5, JavaScript vanilla, Tailwind CSS, vite.
- **Database (Simulated):** JSON Server.

## 🚀 Installation and execution:

1.  Install the dependencies in the folder `client` and run:
    ```bash
    cd client
    npm i
    npm run dev
    ```
2.  Set up and start your server in the folder `api`:
    ```bash
    cd api
    npm i
    npx json-server data/db.json
    ```

## 👨‍💻 Author:

**Github:** **[Emanuel Manotas](https://github.com/Emanuel1102)**
