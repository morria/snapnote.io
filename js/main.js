require.config({
  shim: {
    Easel: {
      exports: 'createjs'
    }
  },
  paths: {
    Easel: 'vendor/easeljs-0.6.1.min',
  }
});

require(['jquery', 'Easel', 'io/snapnote/graphics/tools/Square'],
  function($, Easel, Square) {

    var stage = new Easel.Stage('canvas');

    var square = new Square();
    stage.addChild(square);


    stage.update();
  }
);
