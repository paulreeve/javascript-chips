var makeChips = function (size, salt) {
  console.log(this.getChipCount());
};

var chipper = {
  getChipCount: function () {
    return 26;
  }
};

makeChips.call(chipper, 'large', true);