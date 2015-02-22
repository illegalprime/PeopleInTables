if (Meteor.isClient) {
    Template.peopleTable.helpers({
        people: function() {
            return {
                headers: ['Hello', 'World'],
                data: [['Mark', 'hello']]
            };
        }
    });

    var onResize = function() {
        $('#background').height($(window).height() - $('#background').offset().top);
    };

    $(document).ready(function() {
        $('#people').DataTable();
        onResize();
    });

    $(window).resize(onResize);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
