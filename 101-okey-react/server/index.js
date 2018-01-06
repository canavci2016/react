/*
 * Status Codes
 *
 * 101: user exists
 * 102: user not exists
 * 103: selected user is the same as authenticated user
 * 202: user login success
 * 203: room create success
 *
 * 401: missing object fields
 *
 * */


var io = require('socket.io')();

var users = {};

var rooms = {};


io.on('connection', function (socket) {


    function updateNickNames() {
        io.sockets.emit('usernames', Object.keys(users));
    }

    function findRooms() {
        var roomList = [];

        Object.keys(rooms).forEach(function (key) {

            rooms[key].forEach(function (room) {
                if(key in users)
                {

                }
                else
                {
                    delete users[key];
                    return true;
                }

             roomList.push({name:room.name,id:room.id,owner:key});

            });

        });

        return roomList;
    }

    function updateRooms() {
        io.sockets.emit('rooms', findRooms());
    }


    socket.on('login', function (name, callback) {
        if (name in users) {
            return callback(101);
        }

        callback(202);
        socket.nickname = name;
        users[socket.nickname] = socket;

        socket.emit('me', {nick: socket.nickname});
        updateNickNames();
        updateRooms();
        socket.emit('isLogin', {code: 101, nickname: socket.nickname});

    });

    socket.on('isLogin', function (data) {
        if (socket.nickname === undefined) {
            socket.emit('isLogin', {code: 102, nickname: ''});
        }
        else
            socket.emit('isLogin', {code: 101, nickname: socket.nickname});

    });

    socket.on('privateMessage', function (obj, callback) {
        if (obj.user === undefined || obj.msg == undefined)
            callback(401);

        if (obj.user === socket.nickname)
            callback(103);


        if (!obj.user in users)
            callback(102);


        users[obj.user].emit('private_messages', {sender: socket.nickname, msg: obj.msg});


    });


    socket.on('roomCreate', function (data, callback) {
        var roomName = data.name;

        if (socket.nickname in rooms) {

        } else
            rooms[socket.nickname] = [];


        obj={
            name:roomName,
            id:Math.round(+new Date()/1000)
        };

        rooms[socket.nickname].push(obj);


        //socket.join(roomName);

        updateRooms();

        callback(203);

    });

    socket.on('roomList', function (data) {
        updateRooms();
    });

    socket.on('userList', function (data) {
        updateNickNames();
    });

    socket.on('disconnect', function (data) {
        if (!socket.nickname) return;

        delete rooms[socket.nickname];
        delete users[socket.nickname];

        updateNickNames();
        updateRooms();

    });


});
io.listen(8000);