// Index page
// Routing and DB connect

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { routingLikeAPro } from "./routes/story.routes";
import cors from "cors";

const app: Express = express();
const PORT: any = process.env.PORT;
const URL: any = process.env.MONGODB_URL;
const routes: Array<any> = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routing
app.listen(PORT, () => {
  console.log(`hello world`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello world 😆🌇");
});

// DB connections
routingLikeAPro(app);

mongoose
  .connect(URL)
  .then(() => {
    console.log(`Database chinese story connected::::`);
  })
  .catch((err) => console.log(err));
