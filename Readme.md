# AudioBook: A tiny voice recorder app for personal use

This repository is the deliverable of the full-stack assignment, which I've been asked to solve for the [AWS Full Stack Lead Developer](https://apply.workable.com/expedite-commerce/j/3FC3A6AEB0/) role in **Re:them** under **Expedite Commerce**. In a nutshell, this assignment is asking for a voice recorder app in which the users will be able to record any audio seamlessly and also be able to play them anytime in the future.

#### How to run?

This dockerized setup is incredibly simple to run in your local environment, provided that the Docker daemon is running, you've cloned this repository and already inside it via your preferred terminal app.

We have a few commands to work with which are listed below:

1. `yarn setup` is used to install the necessary dependencies for both the server and client apps.
2. `yarn build` is used to create the docker images from both the apps.
3. `yarn start` is used to create the containers from the images and finally to run them.
4. `yarn stop` is used to stop all the running containers under this dockerized environment.
5. `yarn list` is used to list all the running containers in the terminal.
6. `yarn logs` is used to display the logs of a module in a container when the dockerized setup is running. To get the logs for the server module, we can execute `yarn logs server`.
7. `yarn migrate` is used to create necessary tables and relations in the underlying **PostgreSQL** database.

To launch the dockerized environment for the first time, please execute:

```
yarn setup && yarn build && yarn start && yarn migrate && yarn stop && yarn start
```

For subsequent turn on/off requirements, just use `yarn start` and `yarn stop` command.

#### Front-End

The assignment was to build a voice recorder app utilising [Vue.js](https://vuejs.org/) or any other preferred front-end framework. I used [React.js](https://react.dev/) under [Next.js](https://nextjs.org/) as the front-end frameworks as I haven't worked with [Vue.js](https://vuejs.org/) yet. Additionally, I used [Shadcn UI](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/) for components and styling. Although a minimal UI is asked for, mine is a bit aesthetically pleasing. I have integrated [Aceternity UI](https://ui.aceternity.com/) on the front-end to do so!

#### Back-End

For the back-end I used [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/). Also there is a [Socket.IO](https://socket.io/) implementation to stream the audio from the client to the server.  Though we have two different apps for the server and client, I'm submitting only one [GitHub](https://github.com/arkachego/audiobook) repository containing both of them. Actually, this repository is the parent dockerized environment to run both the apps together in any local environment where [Docker](https://www.docker.com/) is running. Also there is a [PostgreSQL](https://www.postgresql.org/) database behind the server app. A separate service is listed under the `compose.yaml` file for it in this dockerized setup.

#### Opinions

In real life, the server and client apps must reside in two separate repositories and the dockerized environment will be another different one. In this setup, we need to write more scripts to clone the linked repositories, installing the dependencies of the same, building them and finally make them live in the dockerized environment. 

> This full-stack assignment is undoubedly the best one among all the others I have solved till date!
