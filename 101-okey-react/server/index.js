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
 * 402: mysql error
 *
 * */


var io = require('socket.io')();
var database = require('../src/constants/database');
var jwt = require('jsonwebtoken');
const SECRET_KEY = require('../src/constants/server_secret_key');


var mysql = require('mysql');
var mysqlCon = mysql.createConnection(database.mysql);

mysqlCon.connect(function (err) {
    if (err) throw err;
});


var users = {};

var rooms = {};


io.on('connection', function (socket) {


    function updateNickNames() {
        io.sockets.emit('usernames', Object.keys(users));
    }


    function findRooms() {
        var roomList = [];

        var rms= io.nsps['/'].adapter.rooms;

        console.log(rms);

        Object.keys(rooms).forEach(function (key) {


            rooms[key].forEach(function (room) {



                if (key in users) {

                }
                else {
                    delete users[key];
                    return true;
                }

                roomList.push({name: room.name, id: room.id, owner: key});

            });

        });

        return roomList;
    }

    function updateRooms() {
        io.sockets.emit('rooms', findRooms());
    }


    socket.on('login', function (name, callback) {

        mysqlCon.query(`SELECT * FROM users where nick="${name}" limit 1`, function (err, result, fields) {
            if (err)
                return callback({code: 402, token: null});

            if (result.length == 0)
                return callback({code: 101, token: null});

            socket.nickname = result[0].nick;
            users[socket.nickname] = socket;
            updateNickNames();
            updateRooms();

            var obj = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {nick: socket.nickname, page: '1'},
            };


            var token = jwt.sign(obj, SECRET_KEY);


            return callback({code: 202, token: token});

        });

    });


    socket.on('register', function (obj, callback) {

        var sql = `SELECT * FROM users where nick="${obj.nick}" || email="${obj.email}" `;
        mysqlCon.query(sql, (err, result, fields) => {
            if (err)
                return callback({code: 402, token: null});

            if (result.length > 0)
                return callback({code: 101, token: null});


            sql = `INSERT INTO users (name, surname,email,nick,facebook_id) VALUES ('${obj.name}', '${obj.surname}','${obj.email}','${obj.nick}','${obj.facebook_id}')`;

            mysqlCon.query(sql, (err, result) => {
                if (err)
                    return callback({code: 402, token: null});

                var lanstInsertedId=result.insertId;

                 sql = `SELECT * FROM users where id="${lanstInsertedId}" `;

                mysqlCon.query(sql, (err, result, fields) => {
                    if (err)
                        return callback({code: 402, token: null});

                    if (result.length == 0)
                        return callback({code: 102, token: null});

                    socket.nickname = result[0].nick;

                    users[socket.nickname] = socket;
                    updateNickNames();
                    updateRooms();


                    var obj = {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: {nick: socket.nickname, page: '1'},
                    };


                    var token = jwt.sign(obj, SECRET_KEY);

                    return callback({code: 202, token: token});



                });

            });


        });

    });


    socket.on('logIntoUsers', function (nickname) {

        if (!(nickname in users)) {
            socket.nickname = nickname;
            users[socket.nickname] = socket;
        }
        function updateNickNames() {
            io.sockets.emit('usernames', Object.keys(users));
        }
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


       var obj = {
            name: roomName,
            id: Math.round(+new Date() / 1000)
        };

        rooms[socket.nickname].push(obj);

        socket.join(obj.id);


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