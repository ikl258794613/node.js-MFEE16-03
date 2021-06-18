// const name = "Ian";

const car = {
  brand: "TOYATA",
  color: "blue",
};

exports.getcolor = function () {
  return car.color;
};
// console.log(car);
// { getBrand: [Function (anonymous)] }
// console.log(car.getBrand());
// blue

exports.setcolor = function (color) {
  if (color == "white" || color == "black") {
    car.color = color;
  }
};

// exports.car
//{}
// exports.car = car;
//{ car: { brand: 'TOYATA', color: 'blue' } }

// 同時使用 modules.export 和 export
// 只會拿到 modules.export
