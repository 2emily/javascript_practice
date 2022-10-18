var adder = (function () {
  return {
    addOne: function (num) {
      return num + 1;
    },
    addTwo: function (num) {
      return num + 2;
    },
    addNumbers: function (nums) {
      return nums.reduce((agg, cur) => agg + cur, 0);
    },
  };
})();
