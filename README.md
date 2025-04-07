installed dotenv to keep our info secure
2 - encountered issues with cors, again!!!! the browser is blocking my reques to api.football, because it doesn't include cors headers to allows said connection, using heroku only offers a temporary fix, i will need a server side request for it to run better in production

<!-- FIXME  -->
My frontend is running on localhost:3000 trying to access http://api.football-data.org. the browser blocks this due to cross origin resource sharing policy aka cors,  or else the external api explicitly allows ny origin localhost:3000, the browser will block it
- i cannot change headers in a third party api but we can create our own backend that recieves request from my frontend, , calls the football api for my frontend and sends teh response back to my frontned free from cors

<!-- TODO - fix -->
create a simple node proxy server that talks to our react app, these server will handle our calls to the football api as server-to-server calls dont have cors issue

encountered an issue access .env varaibles, at first i thought it was becasue i has no "proxy" varaible in my package.json but i accessed the token like ${token}, instead of process.env.tokenname

i also istalled nodemon as a dev dependency and added it under the scripts - dev section in my package.json
updated tailwindcss to make project more responsive