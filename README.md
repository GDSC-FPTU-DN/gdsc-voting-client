# GDSC Voting Client

This React + TS is built UI for Voting Website.

Technologies:

- `React` + `TS` for main framework
- `React-router-dom` for client router
- `Axios` for APIs request

## 📃Documentation

This App is pre-built `front-end`, so you only need to do the `back-end`.

### Define endpoint for UI

Put the endpoint to URL

```
https://gdsc-voting-client.vercel.app/?endpoint=<your-url>
```

### Built-in requests

Define the route name `<your-url>/`. The UI will fetch the schema from it. The example below wrote for `express`.

```js
app.get("/", (req, res) => {
  res.json(schema);
});
```

Define the route name `<your-url>/submit`. When user do voting, the result is post back to your url. The example below wrote for `express`.

```js
app.post("/submit", (req, res) => {
  console.log(req.body);
});
```

The submit content will be:

```js
req.body = {
  position: "Your defined",
  candidate: "Your candidate",
  ip: "Ip of client",
};
```

### Schema for Voting

You must define your JSON as below

- Schema for UI

```ts
type Schema = Position[];
```

- Type of Position.

```ts
type Position = {
  title: string;
  description?: string;
  candidates: Candidate[];
};
```

- Type of Candidate

```ts
type Candidate = {
  name: string;
  description?: string;
  imageUrl?: string;
};
```

### Static images for UI

The static image must be access via your provided url. The below example wrote for `express`.

```js
// Define static folder
app.use("/static", express.static("public"));
```

```js
// Put static in your schema
const schema = [{
   ...
   imageUrl: "/static/img-name.jpg"
}];
```

Your image will be accessed via url: `<your-url>/static/img-name.jpg`.
