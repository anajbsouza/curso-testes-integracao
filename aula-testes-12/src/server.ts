import app from "./app";

const port = 5002;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})