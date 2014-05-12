var makeMoreChips;

function makeChips(type) {
  this.type = type;
  
  this.getChipType = function () {
    return this.type;
  };
  
  makeMoreChips = this;
}

var chips = new makeChips('large');

console.log(makeMoreChips.getChipType());
console.log(chips.getChipType());