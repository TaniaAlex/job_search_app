### Advanced FB Dropdown Menu

### GitHub Jobs API - Search App

### Dependencies

npm i react-bootstrap axios

- Renders Markdown as pure React components

npm i react-markdown

### Used

useReducer
useEffect
axios.CancelToken.source()

### Fix CORS issue

- use proxy via https://cors-anywhere.herokuapp.com/ before JOBS_URL

This API enables cross-origin requests to anywhere.

- due to using the proxy via heroku some can run into limiting issues (200 requests per hour), add "proxy":"https://jobs.github.com" in your package.json, then adjust the JOBS_URL to "/positions.json". Restart the project by hitting CTRL + C and npm start again.
