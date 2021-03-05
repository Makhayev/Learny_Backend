const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 80
const {v4: uuidV4} = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "null")
    // res.header("Access-Control-Allow-Origin", )
    next();
});




app.get('/', (req, res) => {
    res.redirect( `/${uuidV4()}`)
    
})


app.get('/:room', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    
    res.render('room', {roomId: req.params.room})
    
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roodId).broadcast.emit('user-connected', userId)
    })
})

server.listen(PORT, () => {
    console.log("Listnening...")
})
