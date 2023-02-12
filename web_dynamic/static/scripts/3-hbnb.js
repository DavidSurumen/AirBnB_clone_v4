$(document).ready(function () {
  // amenity checkboxes
  let amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-name')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-name')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  // red and grey disc
  $.ajax({
    url: 'http://' + window.location.hostname + ':5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  // build places
  $.ajax({
    url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    error: function (res) {
      $('.places').append('<b>Oops! 🙉</b>');
      console.log(res);
    },
    success: function (res) {
      let count = 0;
      $.each(res, function (key, val) {
        let article = $('<article>');
        count += 1;
        let title = $('<div>', {'class': 'title_box'});
        title.append($('<h2>').text(val.name));
        title.append($('<div>', {'class': 'price_by_night', 'text': '$' + val.price_by_night}));
        let info = $('<div>', {'class': 'information'});
        info.append($('<div>', {'class': 'max_guest', 'text': val.max_guest + 'Guests'}));
        info.append($('<div>', {'class': 'number_rooms', 'text': val.number_rooms + 'Rooms'}));
        info.append($('<div>', {'class': 'number_bathrooms', 'text': val.number_bathrooms + 'Bathrooms'}));
        article.append(title);
        article.append(info);
        writeOwner(val.user_id, count);
        article.append($('<div>', {'class': 'user', 'id': count}));
        article.append($('<div>', {'class': 'description', 'html': val.description}));
        $('.places').append(article);
      });
    }
  });
});

function writeOwner (uid, count) {
  $.ajax({
    url: 'http://' + window.location.hostname + ':5001/api/v1/users/' + uid,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      let v = '#' + count + '.user';
      $(v).html('<b>Owner:</b> ' + data.first_name + ' ' + data.last_name);
    }
  });
}
