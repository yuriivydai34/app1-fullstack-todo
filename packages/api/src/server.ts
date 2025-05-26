import express from "express";
import Server from "./index";

const app = express();
const port = process.env.PORT || 8080;

new Server(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 