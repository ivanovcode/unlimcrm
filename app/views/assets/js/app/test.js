$(document).ready(function() {
    $("#list-today, #list-tomorrow, #list-due").sortable({
        connectWith: ".list",
        start: function() {
            $('.context-nav').addClass('active');
        },
        stop: function() {
            $('.context-nav').removeClass('active');
        }
    }).disableSelection();
    console.log('sortable');
});