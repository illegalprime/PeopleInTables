Meteor.methods({
    getPeople: function(data, callback) {
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
