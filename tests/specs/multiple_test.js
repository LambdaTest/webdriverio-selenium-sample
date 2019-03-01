var specs = [
  './multiple/multitest1.js',
  './multiple/multitest2.js',
  './multiple/multitest3.js'
];

for (var i = specs.length - 1; i >= 0; i--) {
  require(specs[i]);
};
