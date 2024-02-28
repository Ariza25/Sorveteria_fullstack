import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(function(req, res, next) {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
  });
  app.use('/uploads', express.static(path.join('uploads')));

const port = 3333

app.listen(port, () => {
    console.log(`Server started on ${port}!`);
});

export default app;