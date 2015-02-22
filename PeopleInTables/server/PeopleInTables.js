Meteor.startup(function () {
    console.log(Meteor.settings.postgres);
});

Router.route('/api/getPeople', function() {
    console.log("Get REQUEST!!!");
});
