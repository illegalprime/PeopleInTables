Meteor.call('getHeaders', function(error, result) {
    for (var i in result) {
        $('.headerRow').append('<th>' + result[i].toUpperCase() + '</th>');
    }

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

var onResize = function() {
    var newHeight = $(window).height() - $('#background').offset().top;
    $('#background').height(newHeight < 0 ? 200 : newHeight);
};

$(window).resize(onResize);
