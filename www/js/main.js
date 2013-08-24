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
    Underscore: 'vendor/underscore-min',
    jquery: 'vendor/jquery-1.10.2.min'
  }
});

require(['io/snapnote/app/SnapNote', 'io/snapnote/app/Analytics'],
  function(SnapNote, Analytics) {
    var snapNote = new SnapNote();
    var analytics = new Analytics();
  }
);
