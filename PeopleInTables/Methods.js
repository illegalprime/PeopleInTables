Meteor.methods({
    getPeople: function(data, callback) {
        console.log(data);
        return {
            "data": {
                "name": "Tiger Nixon",
                "world": "Not here"
            }
        };
    },
    getHeaders: function() {
        return ['Hello', 'World'];
    }
});
