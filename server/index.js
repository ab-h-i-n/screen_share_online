const express = require('express');
const app = express();
const PORT = process.env.PORT;
const allRoutes = require('./routes');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


const io = new Server ( server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST" ]
    }
} )

require('./socket')(io);

app.use('/api' , allRoutes);