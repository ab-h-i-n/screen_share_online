const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const { Server } = require("socket.io");
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);



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

router.get('/',(req,res)=>{
    res.send('Server is running!');
})

