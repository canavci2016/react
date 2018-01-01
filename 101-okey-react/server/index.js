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
        var availableRooms = [];
        var rooms = io.sockets.adapter.rooms;
        if (rooms) {
            for (var room in rooms) {
                if (!rooms[room].hasOwnProperty(room)) {
                    var Obj = {
                        name: room,
                        clients: []
                    };

                    //var roster = io.sockets.clients("can");
                    /*  roster.forEach(function(client) {
                         Obj.clients.push(client.nickname);
                      });*/

                    availableRooms.push(Obj);
                }
            }
        }
        return availableRooms;
    }

    function updateRooms() {
        io.sockets.emit('rooms', findRooms());
    }


    socket.on('login', function (name, callback) {
        if (name in users)
            callback(101);

        callback(202);
        socket.nickname = name;
        socket.createdRooms = [];

        users[socket.nickname] = socket;

        socket.emit('me', {nick: socket.nickname});
        updateNickNames();
        updateRooms();

    });

    socket.on('isLogin', function (data, callback) {
        if (socket.nickname == undefined)
            callback(102);
        else
            callback(101);

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

        if (socket.createdRooms === undefined)
            socket.createdRooms = [];

        socket.createdRooms.push(roomName);
        socket.join(roomName);

        updateRooms();

        callback(203);

    });


    socket.on('disconnect', function (data) {
        if (!socket.nickname) return;

        delete users[socket.nickname];
    });


});
io.listen(8000);