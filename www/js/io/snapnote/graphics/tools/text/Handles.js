define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var TextHandles = function() {
        this.initialize();
    }

    TextHandles.prototype = _.extend(new Handles('rectangle.Handles'), {
    });

    var initialize = TextHandles.prototype.initialize;
    TextHandles.prototype.initialize = function() {
      initialize.call(this);

      var nwHandle = new Handle();
      nwHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width - event.delta.x)/(width);

        this.target.scale *= scale;
        this.target.x += event.delta.x;
        this.target.y -= (height * scale - height);
      }, this));
      this.addChild(nwHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = (width + event.delta.x)/(width);
        var height = this.target.height * this.target.scale;

        this.target.scale *= scale;
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.set({
          x: 0,
          y: -Math.round(nwHandle.height)
        });

        seHandle.set({
          x: (this.target.width * this.target.scale) - (Math.round(nwHandle.height)),
          y: this.target.height * this.target.scale
        });
      }, this));
    }

    return TextHandles;
  }
);
