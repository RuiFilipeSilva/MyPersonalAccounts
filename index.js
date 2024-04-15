/* The difference between .mjs and .js files lies in how they handle ECMAScript modules.

.js: This is the traditional file extension for JavaScript files. By default, Node.js treats .js files as CommonJS modules. CommonJS is the module system that Node.js has used historically. It uses require and module.exports to import and export values between files.

.mjs: This is a newer file extension introduced for JavaScript files that should be treated as ECMAScript modules by Node.js. ECMAScript modules are the official standard format to package JavaScript code for reuse. They use import and export syntax for importing and exporting values between files.
 */
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./mydb.js");
const passport = require("passport");
require("./middleware/passport")(passport);
const app = express();
const port = 3001;

/* Connection to DB I need to make first a connection to database and only after start the server*/
connectDB()
  .then(() => {
    // This line is necessary to parse the body of POST requests with form data
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    /* Passport */
    app.use(passport.initialize());
    /* Movements Routes */
    const movementsRoutes = require("./routes/movementsRoutes.js");
    app.use("/movements", movementsRoutes);

    /* Categories Routes */
    const categoriesRoutes = require("./routes/categoriesRoutes.js");
    app.use("/categories", categoriesRoutes);

    /* Descriptions Routes */
    const descriptionsRoutes = require("./routes/descriptionRoutes.js");
    app.use("/descriptions", descriptionsRoutes);

    /* Auth Routes */
    const authRotes = require("./routes/authRoutes");
    app.use("/auth", authRotes);

    /* Users Routes */
    const usersRoutes = require("./routes/usersRoutes");
    app.use("/users", usersRoutes);

    /* Error handling middleware */
    const errorHandler = require("./middleware/errorHandler");
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
