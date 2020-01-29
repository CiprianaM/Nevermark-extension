// Event handler for the switch

let button = $('#toggle-button');

$(button).click(() => {
  if ($(button).prop('checked')) {
    console.log('TURNED ON');
  }
  else {
    console.log('TURNED OFF');
  }
});
