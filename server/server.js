require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const _dirname = path.resolve();

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// handling cors policy issues
const corsOptions = {
  origin: "https://admin-01.onrender.com",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// Mount the roter: To use the router in your main express.app, you can 'mount' it at a specific url prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);
app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`listen port at: ${PORT}`);
  });
});
