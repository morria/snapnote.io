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

    $('#stage').on('selectstart', false);

    var stage = new Stage(600, 300);

    _.each(_.range(Math.random()*5), function() {
        stage.addStageObject(
          _.extend(new Rectangle(30 + Math.random() * 50, 30 + Math.random() * 50), {
            x: Math.random() * 550,
            y: Math.random() * 250
          }));
    });

    stage.update();
  }
);
