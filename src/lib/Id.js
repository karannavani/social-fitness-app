const Id = {};

Id.create = function() {
  const m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math;
  const d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date;
  const h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;
  const s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (s) {
    return m.floor(s).toString(h);
  };
  return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, function () {
    return s(m.random() * h);
  });
};

export default Id;
