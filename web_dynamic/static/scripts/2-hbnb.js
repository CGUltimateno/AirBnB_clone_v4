$(document).ready(function () {
    const amenityId = {};
    $('input[type="checkbox"]').click(function () {
        if ($(this).is(':checked')) {
        amenityId[$(this).data('id')] = $(this).data('name');
        } else {
        delete amenityId[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenityId).join(', '));
    });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
        $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
});
