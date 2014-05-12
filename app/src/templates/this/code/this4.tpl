var makeChips = function (size, salt) {
  console.log(this.getChipCount());
  console.log(size);
  console.log(salt);
};

var chipper = {
  getChipCount: function () {
    return 26;
  }
};

makeChips.apply(chipper, ['large', true]);