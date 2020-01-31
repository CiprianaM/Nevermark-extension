$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault();
    console.log($('#query').val());
    window.open('http:///localhost:3001/search/' + $('#query').val());
  });
});
/*
// Event handler for the switch

let button = $('#toggle-button');
const turnOn = async () => {
  await chrome.runtime.sendMessage({cmd: "ON"},
  function(response) {
    console.log(response);

  });
}
const turnOff = async () => {
  await chrome.runtime.sendMessage({cmd: "OFF"},
  function(response) {
    console.log(response);

  });
}
  $(button).click(() => {
    if ($(button).prop('checked')) {
      turnOn();
      console.log('TURNED ON');
    }
    else {
      turnOff();
      console.log('TURNED OFF');
    }
  });
 */

