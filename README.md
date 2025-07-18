Installed dotenv to keep our info secure
2 - Encountered issues with CORS again. The browser is blocking my request to api.football, because it doesn't include CORS headers to allow said connection,.Using Heroku only offers a temporary fix; I will need a server-side request for it to run better in production

<!-- FIXME  -->
My frontend is running on localhost:3000, trying to access http://api.football-data.org. The browser blocks this due to cross-origin resource sharing policy, aka CORS,  or else the external api explicitly allows our origin localhost:3000, the browser will block it.
- I cannot change headers in a third-party API, but we can create our backend that receives requests from my frontend, calls the football api for my frontend, and sends the response back to my frontend, free from CORS

<!-- TODO - fix -->
Create a simple node proxy server that talks to our React app. This server will handle our calls to the football api as server-to-server calls don't have CORS issues

Encountered an issue accessing .env variables. At first, I thought it was because I had no "proxy" variable in my package.json, but I accessed the token like ${token}, instead of using process.env.tokenname

I also installed nodemon as a dev dependency and added it under the scripts-dev section in my package.json ✅

Installing a bottleneck for throttling and rate limiting requests to the football api, fetching match data for every team, we want to stay under the api limit ✅

Updated tailwindcss to make the project more responsive ✅

Also, when I refresh while in standings, the whole thing breaks, need to figure that out
Add stats to show the highest goal scorers of the league and any available info 
implement last 5 games ✅
Added standing view based on tab selection, form, full, and short ✅
Revamp home ui with a nav bar and other important attributes
