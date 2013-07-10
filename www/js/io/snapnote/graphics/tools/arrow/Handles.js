define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var ArrowHandles = function() {
      this.initialize();
    }

    ArrowHandles.prototype = _.extend(new Handles('arrow.Handles'), {
      /**
       * @property this.target
       * @type StageObject
       */
      getTarget: function() {
        return this.parent.parent;
      }
    });

    var initialize = ArrowHandles.prototype.initialize;
    ArrowHandles.prototype.initialize = function() {
      initialize.call(this);

      this.__defineGetter__('target', _.bind(this.getTarget, this));

      var headHandle = new Handle();
      headHandle.addEventListener('move', _.bind(function(event) {
        this.target.x += event.delta.x;
        this.target.y += event.delta.y;
        this.target.dx -= event.delta.x;
        this.target.dy -= event.delta.y;
      }, this));
      this.addChild(headHandle);

      var tailHandle = new Handle();
      tailHandle.addEventListener('move', _.bind(function(event) {
        this.target.dx += event.delta.x;
        this.target.dy += event.delta.y;
      }, this));
      this.addChild(tailHandle);

      this.addEventListener('tick', _.bind(function(event) {
        headHandle.x = -Math.round(headHandle.width/2);
        headHandle.y = -Math.round(headHandle.height/2);
        tailHandle.x = this.target.dx - Math.round(tailHandle.width/2);
        tailHandle.y = this.target.dy - Math.round(tailHandle.height/2);
      }, this));
    }

    return ArrowHandles;
  }
);
