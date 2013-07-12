require.config({
  shim: {
    Easel: {
      exports: 'createjs'
    },
    Underscore: {
      exports: '_'
    }
  },
  paths: {
    Easel: 'vendor/easeljs-0.6.1.min',
    Underscore: 'vendor/underscore-min'
  }
});

require(['io/snapnote/app/SnapNote'],
  function(SnapNote) {
    var snapNote = new SnapNote();
  }
);
