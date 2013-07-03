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

require([
    'jquery',
    'io/snapnote/graphics/Stage',
    'io/snapnote/graphics/tools/Square'],
  function($, Stage, Square) {

    var stage = new Stage();

    // stage.addChild(new Square(30, 30));
    stage.addChild(new Square(100, 100));

    stage.update();
  }
);
