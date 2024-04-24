
const router = require('express').Router();

router.post('/',(req,res)=>{
    res.json({
        message : 'start room'
    })
})

router.put('/',(req,res)=>{
    res.json({
        message : 'join room'
    })
})


router.delete('/',(req,res)=>{
    res.send('Leave room');
});


module.exports = router;