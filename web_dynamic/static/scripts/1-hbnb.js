$(document).ready(function () {
  let amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-name')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-name')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
});
