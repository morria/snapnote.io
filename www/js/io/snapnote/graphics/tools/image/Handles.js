define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var ImageHandles = function() {
      this.initialize();
    }

    ImageHandles.prototype = _.extend(new Handles('rectangle.Handles'), {
      /**
       * @property this.target
       * @type StageObject
       */
      getTarget: function() {
        return this.parent.parent;
      }
    });

    var initialize =
      ImageHandles.prototype.initialize;

    ImageHandles.prototype.initialize = function() {
      initialize.call(this);

      this.__defineGetter__('target', _.bind(this.getTarget, this));

      var nwHandle = new Handle();
      nwHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = (width - event.delta.x)/width;

        this.target.scale *= scale;
        this.target.x += event.delta.x;
        this.target.y += event.delta.y;
      }, this));
      this.addChild(nwHandle);

      var neHandle = new Handle();
      neHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = width/(width - event.delta.x);

        this.target.scale *= scale;
        this.target.x += event.delta.x - (width * scale - width);
        this.target.y += event.delta.y;
      }, this));
      this.addChild(neHandle);

      var swHandle = new Handle();
      swHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width - event.delta.x)/width;

        this.target.scale *= scale;
        this.target.x += event.delta.x;
        this.target.y += event.delta.y + (height - (height * scale));
      }, this));
      this.addChild(swHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;

        var scale = (width + event.delta.x)/width;

        this.target.scale *= scale;
        this.target.y += event.delta.y + (height - (height * scale));
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.x = -Math.round(nwHandle.width/2);
        nwHandle.y = -Math.round(nwHandle.height/2);

        neHandle.x = (this.target.width - Math.round(neHandle.width/2)) * this.target.scale;
        neHandle.y = -Math.round(neHandle.height/2);

        swHandle.x = -Math.round(swHandle.width/2);
        swHandle.y = (this.target.height - Math.round(swHandle.height/2)) * this.target.scale;

        seHandle.x = (this.target.width - Math.round(seHandle.width/2)) * this.target.scale;
        seHandle.y = (this.target.height - Math.round(seHandle.height/2)) * this.target.scale;
      }, this));
    }

    return ImageHandles;
  }
);
