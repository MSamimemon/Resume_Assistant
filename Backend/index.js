require('dotenv').config();
const path = require("path")
const connectToMongoDB=require('./db');
const express=require('express');
const cors = require('cors');


connectToMongoDB();
const app = express();
const port= process.env.PORT;



app.use(express.json());
app.use(cors());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// Avaliable Routes:
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/resume',require('./Routes/resume'));
app.use('/api/jobdesc',require('./Routes/jobdesc'));
app.use('/api/application',require('./Routes/application'));
app.use('/api/ats', require('./Routes/ats'));
app.use("/api/dashboard", require("./Routes/dashboard"));
app.get("/", (req, res) => {
res.send("Backend is working");
});

app.listen(port, () => {
console.log(`Resume Assistant is running on http://localhost:${port}`)
})
