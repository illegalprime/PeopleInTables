Meteor.call('getHeaders', function(error, result) {
    Session.set('headers', result);
});

Template.headerRow.helpers({
    headers: function() {
        return Session.get('headers');
    }
});

var onResize = function() {
    $('#background').height($(window).height() - $('#background').offset().top);
};

$(document).ready(function() {
    $('#people').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": function(data, callback) {
            Meteor.call("getPeople", data, function(error, result) {
                callback(result);
            });
        }
    });
    onResize();
});

$(window).resize(onResize);
