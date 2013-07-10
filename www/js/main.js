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
    'io/snapnote/graphics/tools/Rectangle',
    'io/snapnote/graphics/tools/Arrow',
    'io/snapnote/graphics/tools/Text'
    ],
  function($, Easel, Stage, StageObject, Rectangle, Arrow, Text) {

    $('#stage').on('selectstart', false);

    var width = $(document).width();
    var height = $(document).height();

    $('#stage').attr('width', width)
    $('#stage').attr('height', width)

    var stage = new Stage(width, height);

/*
    // A few Rectangles
    _.each(_.range(Math.random()*6), function() {
        stage.addStageObject(
          _.extend(new Rectangle(30 + Math.random() * 50, 30 + Math.random() * 50), {
            x: Math.random() * width,
            y: Math.random() * height
          }));
    });

    // A few arrows
    _.each(_.range(Math.random()*8), function() {
        var dx = ((Math.random()>0.5)?-1:1)*(30 + Math.random()*100);
        var dy = ((Math.random()>0.5)?-1:1)*(30 + Math.random()*100);
        stage.addStageObject(
          _.extend(new Arrow(dx, dy), {
            x: Math.random() * width,
            y: Math.random() * height
          }));
    });

    // A few text boxes
    _.each(_.range(Math.random()*4), function() {
        stage.addStageObject(
          _.extend(new Text("The quick brown fox. And fancy wizards."), {
            x: Math.random() * width,
            y: Math.random() * height
          }));
    });
*/

    stage.addStageObject(
        _.extend(new Text("Hello\nHello\nHello"), {
        x: width * 0.3,
        y: 100
    }));

    // Draw it for the first time
    stage.update();
  }
);
