var syncQuery;
var columnsIndex;
var size;

Meteor.startup(function () {
    pg.connect(Meteor.settings.postgres.url, function(err, client) {
        syncQuery = Meteor.wrapAsync(function(query, callback) {
            client.query(query, function(error, result) {
                callback(error, result);
            });
        });
    });
});

Meteor.methods({
    getPeople: function(req) {
        var query  = 'SELECT * FROM person ';
        var order  = req.order[0].dir == 'asc' ? ' ASC ' : ' DESC ';
        var sort   = ' ORDER BY ' + columnsIndex[req.order[0].column];
        var offset = ' OFFSET ' + req.start;
        var limit  = ' LIMIT '  + req.length;
        var draw   = req.draw;
        var search = req.search.value;
        var full   = query + sort + order + offset + limit;

        var data = syncQuery(full);
        var rows = data.rows;
        var table = [];

        for (i in rows) {
            var row = [];
            for (key in rows[i]) {
                row.push(rows[i][key]);
            }
            table.push(row);
        }

        return {
            data: table,
            "draw": req.draw,
            "recordsTotal": size,
            "recordsFiltered": size,
        }
    },
    getHeaders: function() {
        var columns = syncQuery('SELECT * FROM person WHERE FALSE').fields;
        var headers = [];

        for (i in columns) {
            headers.push(columns[i].name);
        }
        columnsIndex = headers;
        Meteor.call('getSize', function(error, result) {});
        return headers;
    },
    getSize: function() {
        size = syncQuery('SELECT COUNT(*) FROM person').rows[0].count;
        return size;
    }
});
