'use strict';
console.log('%cfunctions', 'font-size:20px;color:green;text-decoration:underline');
//default function parameters
//параметры по умолчанию могут быть не только литералами,но и выражениями, причем может использоваться предыдущий параметр
const sum = (a,b=2,c=4) => {
  return a+b+c;
}
console.log(sum(3));
const booking=[];
function createBooking(flightNum,numPassengers=1,price=200*numPassengers) {
    //ES5
    //numPassengers??=3;
    const bookingLoc={flightNum,numPassengers,price};
    booking.push(bookingLoc);

}
createBooking('LH323');
//по сути,поскольку третий параметр - это выражение,то нам его можно вообще не указывать
createBooking('LH433',3);
//чтобы пропустить параметр по умолчанию,то ему можно назначить значение undefined
createBooking('LH33',undefined,400);
console.log(booking);

