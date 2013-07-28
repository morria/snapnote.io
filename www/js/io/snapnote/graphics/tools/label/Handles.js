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
      angle: 0,

      /**
       * @property direction
       * @type Direction
       */
      direction: Direction.SOUTH

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
          x: this.target._editableText.x + (this.target._editableText.width * this.target.scale)/2,
          y: this.target._editableText.y + (this.target._editableText.height * this.target.scale)/2
        };

        var mouse = this.globalToLocal(event.stageX, event.stageY);

        this.angle = Math.atan2(mouse.x - center.x, mouse.y - center.y);

        if (this.angle >= (-Math.PI/4) && this.angle < (Math.PI/4)) {
          this.direction = this.target.direction = Direction.SOUTH;
        } else if (this.angle < (-Math.PI/4) && this.angle > (-3 * Math.PI/4)) {
          this.direction = this.target.direction = Direction.WEST;
        } else if (this.angle >= (Math.PI/4) && this.angle < (3 * Math.PI/4)) {
          this.direction = this.target.direction = Direction.EAST;
        } else {
          this.direction = this.target.direction = Direction.NORTH;
        }

      }, this));
      this.addChild(directionHandle);

      this.addEventListener('tick', _.bind(function(event) {
        neHandle.set({
          x: (neHandle.width/2) + (this.target.width * this.target.scale) - (Math.round(neHandle.height)) - ((this.direction == Direction.EAST ? 38 : 0)*this.target.scale),
          y: -(neHandle.height/2)
        });

        var center = {
          x: this.target._editableText.x + (this.target._editableText.width * this.target.scale)/2,
          y: this.target._editableText.y + (this.target._editableText.height * this.target.scale)/2 + (this.target._editableText.lineHeight * 0.1)
        };

        var radiusX = this.target._editableText.width/2 + 40 + (2*this.target.padding);
        var radiusY = this.target._editableText.height/2 + 40 + (2*this.target.padding);

        directionHandle.set({
          x: center.x + (Math.sin(this.angle)*radiusX*this.target.scale) - (directionHandle.width/2),
          y: center.y + (Math.cos(this.angle)*radiusY*this.target.scale) - (directionHandle.height/2)
        });

      }, this));
    }

    return LabelHandles;
  }
);
