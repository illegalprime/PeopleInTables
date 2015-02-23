Meteor.call('getHeaders', function(error, result) {
    Session.set('headers', result);

    $('#people').dataTable({
        "processing": true,
        "serverSide": true,
        "drawCallback": onResize,
        "ajax": function(data, callback) {
            Meteor.call("getPeople", data, function(error, result) {
                callback(result);
            });
        }
    });
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
});

$(window).resize(onResize);
