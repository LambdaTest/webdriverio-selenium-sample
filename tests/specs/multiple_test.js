var specs = [
  './multiple/dragDropSliders.e2e.js',
  './multiple/inputFormSubmit.e2e.js',
  './multiple/simpleForm.e2e.js'
];

for (var i = specs.length - 1; i >= 0; i--) {
  require(specs[i]);
};
