define(['Underscore', 'Easel'],
  function(_, Easel) {
    var Stage = function(canvasElementId) {
        // Continue tracking the mouse even when it leaves
        // the canvas
        this.mouseMoveOutside = true;

        // Disable selection on the canvas
        this.canvas.onselectstart = function() { return false; }
    }

    Stage.prototype = _.extend(new Easel.Stage('stage'), {
    });

    return Stage;
  }
);
