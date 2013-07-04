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
    'Easel',
    'io/snapnote/graphics/Stage',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/Rectangle'],
  function($, Easel, Stage, StageObject, Rectangle) {

    var stage = new Stage();

    var rectangle_a = new Rectangle(30, 30);
    rectangle_a.x = 50;
    rectangle_a.y = 50;
    stage.addChild(rectangle_a);

    stage.addChild(new Rectangle(100, 100));

    stage.update();
  }
);
