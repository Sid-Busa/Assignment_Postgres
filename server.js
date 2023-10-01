const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

require("./app/routes/tutorial.routes")(app);

app.listen(8000, () => {
    console.log('Magic Happens at port 8000')
})