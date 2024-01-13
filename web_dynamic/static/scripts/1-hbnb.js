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
}