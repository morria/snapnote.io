define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles',
    'io/snapnote/graphics/tools/label/Direction'],
  function(_, Easel, Handle, Handles, Direction) {
    var LabelHandles = function() {
        this.initialize();
    }

    LabelHandles.prototype = _.extend(new Handles('label.Handles'), {
      /**
       * @property angle
       * @type Number
       */
      angle: 0
    });

    var initialize = LabelHandles.prototype.initialize;
    LabelHandles.prototype.initialize = function() {
      initialize.call(this);

      var neHandle = new Handle();
      neHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = (width + event.delta.x)/(width);
        var height = this.target.height * this.target.scale;
        this.target.scale *= scale;
      }, this));
      this.addChild(neHandle);

      var directionHandle = new Handle();
      directionHandle.addEventListener('move', _.bind(function(event) {
        var center = {
          x: (this.target.width * this.target.scale)/2,
          y: (this.target.height * this.target.scale)/2
        }

        var x =
          (directionHandle.x + event.delta.x) - center.x;

        var y =
          (directionHandle.y + event.delta.y) - center.y;

        this.angle = Math.atan2(x,y);

        if (this.angle >= (-Math.PI/2) && this.angle < (Math.PI/2)) {
          this.target.direction = Direction.SOUTH;
        } else {
          this.target.direction = Direction.NORTH;
        }

      }, this));
      this.addChild(directionHandle);

      this.addEventListener('tick', _.bind(function(event) {
        neHandle.set({
          x: (neHandle.width/2) + (this.target.width * this.target.scale) - (Math.round(neHandle.height)),
          y: -(neHandle.height/2)
        });

        var center = {
          x: (this.target.width * this.target.scale)/2,
          y: (this.target.height * this.target.scale)/2
        }

        directionHandle.set({
          x: center.x + (Math.sin(this.angle)*60*this.target.scale),
          y: center.y + (Math.cos(this.angle)*60*this.target.scale)
        });

      }, this));
    }

    return LabelHandles;
  }
);
