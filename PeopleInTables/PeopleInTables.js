if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

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
