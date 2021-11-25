import app from "./app.js";

let port = process.env.PORT;

if (process.env.NODE_ENV === "dev") {
  port = 4000;
}

if (process.env.NODE_ENV === "test") {
  port = 4001;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
