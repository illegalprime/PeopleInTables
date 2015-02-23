var pg    = Meteor.npmRequire('pg');
var squel = Meteor.npmRequire('squeal');

pg.connect(Meteor.settings.postgres.url, function(err, client, done) {
    if (err) {
        return console.error('Error getting client from pool', err);
    }


});

Meteor.methods({
    getPeople: function(data) {
        console.log(data);
        return {
            "draw": data.draw,
            "recordsTotal": 57,
            "recordsFiltered": 57,
            "data": [
                [
                    "name",
                    "Tiger Nixon"
                ],
                [
                    "world",
                    "Not here"
                ],
            ]
        };
    },
    getHeaders: function() {
        return ['Hello', 'World'];
    }
});
