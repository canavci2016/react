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
 * 301: json verify error
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

var rooms = [];


io.on('connection', function (socket) {


    function updateNickNames() {
        io.sockets.emit('usernames', Object.keys(users));
    }


    function updateRooms() {
        io.sockets.emit('rooms', rooms);
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
                data: {nick: socket.nickname, id: result[0].id}
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

                var lanstInsertedId = result.insertId;

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
                        data: {nick: socket.nickname, id: result[0].id}
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
        updateNickNames();
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

        var {name, token} = data;

        jwt.verify(token, SECRET_KEY, function (err, decoded) {

            if (err)
                return callback({code: 301, error: err});


            mysqlCon.query(`SELECT * FROM users where id="${decoded.data.id}" limit 1`, function (err, result, fields) {
                if (err)
                    return callback({code: 402, token: null});

                if (result.length == 0)
                    return callback({code: 101, token: null});

                sql = `INSERT INTO rooms (name, owner_id) VALUES ('${name}', '${decoded.data.id}')`;

                mysqlCon.query(sql, (err, result) => {
                    if (err)
                        return callback({code: 402, token: null});

                    var roomID = result.insertId;

                    sql = `INSERT INTO user_rooms (user_id, room_id) VALUES ('${decoded.data.id}', '${roomID}')`;

                    mysqlCon.query(sql, (err, result) => {
                        if (err)
                            return callback({code: 402, token: null});


                        mysqlCon.query(`SELECT * , (select count(*) from user_rooms where room_id=r.id ) as members_count FROM rooms as r`, function (err, result, fields) {
                            if (err)
                                return callback({code: 402, token: null});

                            rooms = result;


                            socket.join(roomID);
                            updateRooms();
                            return callback({code: 202});

                        });


                    });


                });


            });


        });


    });

    socket.on('roomList', function (data) {
        updateRooms();
    });

    socket.on('userList', function (data) {
        updateNickNames();
    });


    socket.on('roomJoin', function (data) {
        updateRooms();
    });


    socket.on('disconnect', function (data) {
        console.log("disconnect success");
        if (socket.nickname) {
            delete users[socket.nickname];

            mysqlCon.query(`SELECT * FROM users where nick="${socket.nickname}" limit 1`, function (err, result, fields) {
                if (err)
                    throw  err;

                if (result.length == 0)
                    throw  'User Not Found according to given nick';

                var userId = result[0].id;

                var sql = `DELETE FROM user_rooms WHERE user_id =${userId}`;
                mysqlCon.query(sql, function (err, result) {
                    if (err) throw err;

                    mysqlCon.query(`SELECT * , (select count(*) from user_rooms where room_id=r.id ) as members_count FROM rooms as r`, function (err, result, fields) {
                        if (err)
                            throw 'MySql Error';

                        rooms = result;

                        updateRooms();
                        updateNickNames();
                    });

                });

            });
        }


    });


});
io.listen(8000);