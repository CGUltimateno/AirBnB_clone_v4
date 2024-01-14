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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      let content = '';
      $.each(data, function (index, place) {
        content += `<article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} ${place.max_guest === 1 ? 'Guest' : 'Guests'}</div>
                    <div class="number_rooms">${place.number_rooms} ${place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            </article>`;
      });
      $('section.places').html(content);
    },
    dataType: 'json'
  });

$('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({ amenities: Object.keys(amenityId) }),
        contentType: 'application/json',
        success: function (data) {
          let content = '';
          $.each(data, function (index, place) {
            content += `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} ${place.max_guest === 1 ? 'Guest' : 'Guests'}</div>
                        <div class="number_rooms">${place.number_rooms} ${place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`;
          });
          $('section.places').html(content);
        },
        dataType: 'json'
    });
}
);