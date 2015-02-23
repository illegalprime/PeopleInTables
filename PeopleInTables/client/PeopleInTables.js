Meteor.call('getHeaders', function(error, result) {
    console.log(result);
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
    Meteor.call('getSize', function(error, result) {
        console.log("SIZE CALL: " + JSON.stringify(result));
    });
});

$(window).resize(onResize);
