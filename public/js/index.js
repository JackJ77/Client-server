const socket = io();

let min = 1;
let max = 10000;
let rand = Math.floor(Math.random() * max) + min;

socket.on('connect', function () {
  console.log('connected to the server');

    socket.emit('checkNumber', rand, function (result) {
      console.log('Wyslana liczba: ' + rand + " Wynik: " + result);
    });
});

socket.on('respondComparison', function (comps) {
  if (comps.matched) {
    console.log('Matched number: ' + rand);
  } else {
    if (comps.greater) {
      min = rand;
      rand = Math.floor(Math.random() * (max - min - 1)) + min + 1;
    } else {
      max = rand;
      rand = Math.floor(Math.random() * (max - min)) + min;
    }
    socket.emit('checkNumber', rand, function (result) {
      console.log('Wyslana liczba: ' + rand + " Wynik: " + result);
    });
  }
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});
