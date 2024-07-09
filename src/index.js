const express  = require('express')
const cors = require('cors')
const routers = require("./routes/index")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/" , routers);

const PORT  = 8080;

app.listen(PORT , () => {
    console.log('Server Listening on port: ' , PORT)
})


module.exports = app