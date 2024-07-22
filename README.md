## StudyNotes 😎 

- Check out live demo: https://study-notes-frontend-ayazhankadessovas-projects.vercel.app
- Sign Up, Sign In :)

### Demo

![ayazhan-studyNotes](https://github.com/user-attachments/assets/462f44c8-fe18-4457-b19d-268584fe6360)

## 📖 About

studyNotes is a platform designed to assist teams in effectively **allocating tasks** during group projects. The application features a structured team hierarchy, where every team has a designated Leader, Vice-Leader, and regular members.

Each team member can:

- create new tasks,
- assign them to other team members,
- add detailed descriptions,
- delete a task.

All team members have visibility into the tasks and can see who they have been assigned to. When a team member completes a task, they have the ability to **mark it as "Completed✅ "** The platform also allows the admin to **add new team members** as needed, ensuring the project can adapt to changing team composition over time.

- [📖 About](#-about)
  - [studyNotes](#studynotes)
- [🚀 Project Setup Backend](#-project-setup-backend)
- [🚀 Project Setup Frontend](#-project-setup-frontend)
  - [🔥 Compile and Hot-Reload for Development](#-compile-and-hot-reload-for-development)
  - [🏗️ Compile and Minify for Production](#️-compile-and-minify-for-production)
- [Recommended IDE Setup](#recommended-ide-setup)

## 🚀 Project Setup Backend

_add environment variables_

0. Create `.env` file & add this variables

```
NODE_ENV=development
MONGO_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

1. git clone project

> git clone https://github.com/ayazhankadessova/studyNotes

2. Install needed packages

> npm install

3. Run using nodemon

> npm run dev

or

> npm start

4. Go to `localhost:3000`

## 🚀 Project Setup Frontend

1. Go to Frontend folder

```sh
cd frontend
```

```sh
npm install
```

### 🔥 Compile and Hot-Reload for Development

```sh
npm run dev
```

### 🏗️ Compile and Minify for Production

```sh
npm run build
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)
