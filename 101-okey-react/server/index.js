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



var mysql=require('mysql');
var mysqlCon = mysql.createConnection(database.mysql);

mysqlCon.connect(function(err) {
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

        mysqlCon.query(`SELECT * FROM users where nick="${name}"`, function (err, result, fields) {
            if (err)
                return callback({code:402,token:null});

            if(result.length==0)
                return callback({code:101,token:null});

            socket.nickname = result.nick;
            users[socket.nickname] = socket;
            updateNickNames();
            updateRooms();

            var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {name:'can',surname:'avci',age:'23'}
            }, SECRET_KEY);


           return callback({code:202,token:token});

        });

    });


    socket.on('register', function (obj, callback) {

        var sql=`SELECT * FROM users where nick="${obj.nick}" || email="${obj.email}" `;
        mysqlCon.query(sql, function (err, result, fields) {
            if (err)
                return callback(402);

            if(result.length>0)
                return callback(101);



             sql = `INSERT INTO users (name, surname,email,nick,facebook_id) VALUES ('${obj.name}', '${obj.surname}','${obj.email}','${obj.nick}','${obj.facebook_id}')`;
            mysqlCon.query(sql, function (err, result) {
                if (err)
                    return callback(402);


                socket.nickname = result.nick;
                users[socket.nickname] = socket;
                updateNickNames();
                updateRooms();
                socket.emit('isLogin', {code: 101, nickname: socket.nickname});
                return callback(202);

            });


        });

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