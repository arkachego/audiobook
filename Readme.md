# AudioBook: A tiny voice recorder app for personal use

This repository is the deliverable of the full-stack assignment, which I've been asked to solve for the [AWS Full Stack Lead Developer](https://apply.workable.com/expedite-commerce/j/3FC3A6AEB0/) role in **Re:them** under **Expedite Commerce**. In a nutshell, this assignment is asking for a voice recorder app in which the users will be able to record any audio seamlessly and also be able to play them anytime in the future.

#### Front-End
The assignment was to build a voice recorder app utilising [Vue.js](https://vuejs.org/) or any other preferred front-end framework. I used [React.js](https://react.dev/) under [Next.js](https://nextjs.org/) as the front-end frameworks as I haven't worked with [Vue.js](https://vuejs.org/) yet. Additionally, I used [Shadcn UI](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/) for components and styling. Although a minimal UI is asked for, mine is a bit aesthetically pleasing. I have integrated [Aceternity UI](https://ui.aceternity.com/) on the front-end to do so!

#### Back-End
For the back-end I used [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/). Also there is a [Socket.IO](https://socket.io/) implementation to stream the audio from the client to the server.  Though we have two different apps for the server and client, I'm submitting only one [GitHub](https://github.com/arkachego/audiobook) repository containing both of them. Actually, this repository is the parent dockerized environment to run both the apps together in any local environment where [Docker](https://www.docker.com/) is running. Also there is a [PostgreSQL](https://www.postgresql.org/) database behind the server app. A separate service is listed under the `compose.yaml` file for it in this dockerized setup.

#### Opinions

In real life, the server and client apps must reside in two separate repositories and the dockerized environment will be another different one. In this setup, we need to write more scripts to clone the linked repositories, installing the dependencies of the same, building them and finally make them live in the dockerized environment. 

> This full-stack assignment is undoubedly the best one among all the others I have solved till date!