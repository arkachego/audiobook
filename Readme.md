# AudioBook: A tiny voice recorder app for personal use

> This full-stack assignment is undoubedly the best one among all the others I have solved till date!

The assignment was to build a voice recorder app utilising [Vue.js](https://vuejs.org/) or any other preferred front-end framework and [Node.js](https://nodejs.org/en) or [Go](https://go.dev/) as the back-end framework.

I used [React.js](https://react.dev/) under [Next.js](https://nextjs.org/) as the front-end framework. Additionally, I used [Shadcn UI](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/) for components and styling. For the back-end I used [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/). Also there is a [Socket.IO](https://socket.io/) implementation to stream the audio from the client to the server.

Although a minimal UI is asked for, mine is a bit aesthetically pleasing. I tried to integrate [Aceternity UI](https://ui.aceternity.com/) on the front-end to do so!

Though we have two different apps for the server and client, I'm submitting only one GitHub repository containing both of them. Actually, this repository is a dockerized setup to run both the apps together in your local [Docker](https://www.docker.com/) environment.

Also there is a [PostgreSQL](https://www.postgresql.org/) database backing the server app. A separate service is listed under the `compose.yaml` file for it in the dockerized development environment.