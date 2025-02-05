# AudioBook: A tiny voice recorder app for personal use

This repository is the deliverable of the full-stack assignment, which I've been asked to solve for the [AWS Full Stack Lead Developer](https://apply.workable.com/expedite-commerce/j/3FC3A6AEB0/) role in **Re:them** under **Expedite Commerce**. In a nutshell, this assignment is asking for a voice recorder app in which the users will be able to record any audio seamlessly and also be able to play them anytime in the future.

#### How to run?

This dockerized setup is incredibly simple to run in your local environment, provided that the Docker daemon is running, you've cloned this repository and already inside it via your preferred terminal app.

We have a few commands to work with which are listed below:

1. `yarn setup` is used to install the necessary dependencies for both the server and client apps.
2. `yarn build` is used to create the docker images from both the apps.
3. `yarn start` is used to create the containers from the images and finally to run them.
4. `yarn stop` is used to stop all the running containers under this dockerized environment.
5. `yarn ps` is used to list all the running containers in the terminal.
6. `yarn logs` is used to display the logs of a module in a container when the dockerized setup is running. To get the logs for the server module, we can execute `yarn logs server`.
7. `yarn migrate` is used to create necessary tables and relations in the underlying **PostgreSQL** database.

To launch the dockerized environment **for the first time**, please execute:

```
yarn setup && yarn build && yarn start && yarn migrate && yarn stop && yarn start
```

Congratulations! **AudioBook** is now hosted on http://localhost:5000. The server is running in http://localhost:3000. For subsequent turn on/off requirements, just use `yarn start` and `yarn stop` commands.

### Front-End Client

It was told to use either [Vue.js](https://vuejs.org/) or any other preferred front-end framework in the requirement. I used [React.js](https://react.dev/) under [Next.js](https://nextjs.org/) as the front-end frameworks as I haven't worked with [Vue.js](https://vuejs.org/) yet. Additionally, I used [Shadcn UI](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/) for components and styling. Although a minimal UI is asked for, mine is a bit aesthetically pleasing. I have integrated [Aceternity UI](https://ui.aceternity.com/) on the front-end to do so!

#### AWS Deployment Strategy

Deployment of the front-end app is super easy through **AWS Amplify**. We can create an **AWS Amplify** app linking the **GitHub** repository and mapping the correct branch to deploy in the **AWS** account in the required region. Upon deployment, **AWS Amplify** provides an **URL** to access the app which has the following pattern:

```
https://<branch_name>.<random_14_chars>.amplifyapp.com
```
If we want to add some custom domains, that provision is also available in **AWS Amplify** under the **Hosting > Custom Domains** page. We have to do this job in all the AWS accounts containing the `develop`, `staging` and `production` environments. Upon doing this, whenever there is a change in the linked branch of the client app, corresponding linked app in **AWS Amplify** will be deployed with the updated codebase. Additionally, we have to include the URL we are using to access the front-end app in corresponding environments into the CORS settings of the server app, coming from the environment variables of the same.

### Back-End Server

For the back-end I used [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/). Also there is a [Socket.IO](https://socket.io/) implementation to stream the audio from the client to the server.  Though we have two different apps for the server and client, I'm submitting only one [GitHub](https://github.com/arkachego/audiobook) repository containing both of them. Actually, this repository is the parent dockerized environment to run both the apps together in any local environment where [Docker](https://www.docker.com/) is running. Also there is a [PostgreSQL](https://www.postgresql.org/) database behind the server app. A separate service is listed under the `compose.yaml` file for it in this dockerized setup.

### AWS Deployment Strategy



### Additional Thoughts

In real situation, the server and client apps must reside in two separate repositories and the dockerized environment should be another different one. In this setup, we need to write more scripts to clone the linked repositories, installing the dependencies of the same, building them and finally make them live in the dockerized environment. 

> This full-stack assignment is undoubedly the best one among all the others I have solved till date!
