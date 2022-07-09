const path = require("path");
const express = require("express");

const session = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");

const connection = require("./config/connection");
const routes = require("./routes");

const SequelizeStore = connectSessionSequelize(session.Store);

const PORT = process.env.PORT || 4000;

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookies: {
    maxAge: 3600 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  store: new SequelizeStore({
    db: connection,
  }),
};

app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

const init = async () => {
  try {
    // connect to DB
    await connection.sync({ force: false });

    // server listen on PORT
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};

init();
