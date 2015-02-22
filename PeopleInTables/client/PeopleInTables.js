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
    $('#people').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/api/getPeople"
    });
    onResize();
});

$(window).resize(onResize);
