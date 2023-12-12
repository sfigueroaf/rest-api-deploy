import express, { json } from "express"; // require -->commonJS
import { moviesRouter, ledRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by"); // deshabilita el header x-powered-by de express

app.use("/movies", moviesRouter);
app.use("/led", ledRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
// node --watch ./app.js
