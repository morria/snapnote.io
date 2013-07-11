define(['Underscore', 'Easel'],
  function(_, Easel) {

    var WIDTH = 10;
    var HEIGHT = 10;
    var RADIUS = 2;

    var Handle = function() {
      this.initialize();
      this.name = 'Handle';

      this.enableMouseOver = true;
      this.cursor = 'pointer';

      // Build the Border
      this.graphics
        .beginStroke('#cecec3')
        .drawRoundRect(0, 0, WIDTH, HEIGHT, RADIUS)
        .endStroke();

      // Build the Body
      this.graphics
        .beginLinearGradientFill(["#fdfdfd","#dcdcdc"], [0, 1], 0, 0, 0, HEIGHT)
        .drawRoundRect(0, 0, WIDTH, HEIGHT, RADIUS);

      // A lil' shadow
      this.shadow = new Easel.Shadow('#ccc', 0, 0, 1);

      /**
        * Handle Dragging
        */
      this.addEventListener('mousedown', _.bind(function(event) {
        var offset = {
          x: event.target.x - event.stageX,
          y: event.target.y - event.stageY
        };

        event.addEventListener('mousemove', _.bind(function(event) {
          this.dispatchEvent({
            type: 'move',
            delta: {
              x: (event.stageX + offset.x) - event.target.x,
              y: (event.stageY + offset.y) - event.target.y
            }
          }, this);
          event.target.getStage().update();

          offset = {
            x: event.target.x - event.stageX,
            y: event.target.y - event.stageY
          };
        }, this));
      }, this));
    }

    // Extend Shape
    Handle.prototype = _.extend(new Easel.Shape(), {
      width: WIDTH,
      height: HEIGHT
    });

    return Handle;
  }
);
