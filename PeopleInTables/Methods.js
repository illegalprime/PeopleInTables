// var pg      = Meteor.npmRequire('pg');
// var squel   = Meteor.npmRequire('squeal');
var Future;
var postgres;
var syncQuery;

if (Meteor.isServer) {
    Future = Meteor.npmRequire('fibers/future');

    Meteor.startup(function () {

        pg.connect(Meteor.settings.postgres.url, function(err, client, done) {

            syncQuery = Meteor.wrapAsync(function(query, callback) {
                client.query(query, function(error, result) {
                    callback(error, result);
                });
            });
        });
    });
}
//
// console.log('Connecting to db...');
// var connect = Meteor.wrapAsync(pg.connect);
// console.log(Meteor.settings.postgres.url);
// pg.connect(Meteor.settings.postgres.url, function(err, client) {
//     Meteor.settings.postgres.client = client;
//     var query  = Meteor.wrapAsync(client.query);
//     client.query('SELECT * FROM person WHERE FALSE', function (err, result) {
//         console.log(result);
//     });
//     query('SELECT * FROM person WHERE FALSE');
// });
    // if (err) {
    //     return console.error('Error getting client from pool', err);
    // }

    // console.log('Sending a query');
//    client.query('SELECT * FROM person LIMIT 5', function(err, result) {
//        console.log('Reading Results.');
//        done();
//
//        if (err) {
//            return console.error('Error on query!', err);
//        }
//        console.log(result);
//        client.end();
//    });
            // var query = Meteor.wrapAsync(client.query);
            // var result = query('SELECT * FROM person WHERE FALSE');
            // done();
            // if (err) {
            //     return console.error('Error on query!', err);
            // }
            // fields = result.fields;
            // headers = [];
            //
            // for (i = 0; i < fields.length; ++i) {
            //     headers.push(fields[i].name);
            // }
            //
            // console.log(headers);
// });



Meteor.methods({
    getPeople: function(req) {
        var data = syncQuery('SELECT * FROM person LIMIT 10');
        console.log(JSON.stringify(data));

        return {
            data: data.rows,
            "draw": req.draw,
            "recordsTotal": 57,
            "recordsFiltered": 57,
        }
    },
    getHeaders: function() {
        var columns = syncQuery('SELECT * FROM person WHERE FALSE').fields;
        var headers = [];

        for (i in columns) {
            headers.push(columns[i].name.toUpperCase());
        }
        return headers;
    },
    getSize: function() {
        return syncQuery('SELECT COUNT(*) FROM person').rows[0].count;
    }
});
