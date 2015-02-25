var syncQuery;
var columnsIndex;
var size;
var squel = Meteor.npmRequire('squel');


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
        var search = req.search.value;
        var numSearch = parseInt(search);
        var query  = squel.select().from('person');
        var count  = squel.select().from('person').field('COUNT(id)');

        if (!isNaN(numSearch)) {
            query = query.where('id = ? OR priority = ? OR phone LIKE ?',
                numSearch, numSearch, '%' + numSearch + '%');
            count = count.where('id = ? OR priority = ? OR phone LIKE ?',
                numSearch, numSearch, '%' + numSearch + '%');
        }
        else {
            search = '%' + search.toLowerCase() + '%';
            query = query.where(
                'LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ?',
                search, search, search);
            count = count.where(
                'LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ?',
                search, search, search);
        }

        // Relying on the the Database caching!
        dataPoints = syncQuery(count.toString()).rows[0].count;

        query = query
            .order(columnsIndex[req.order[0].column], req.order[0].dir == 'asc')
            .offset(req.start)
            .limit(req.length)
            .toString();

        var data = syncQuery(query);
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
            "recordsFiltered": dataPoints,
        };
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
