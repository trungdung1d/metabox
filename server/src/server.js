const express = require('express');
const connectDB = require('./config/connectDB');
const bodyParser = require('body-parser')
const cors = require('cors')
const initWebRoutes = require('./routes/web')
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(cors());

(async () => connectDB());

app.use(express.json()); 


app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true}))

initWebRoutes(app)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
