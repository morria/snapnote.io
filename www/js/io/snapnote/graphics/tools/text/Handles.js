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
        var scale = (width - event.delta.x)/(width);

        this.target.scale = scale;
        this.target.x += event.delta.x;
        this.target.y += event.delta.y;
      }, this));
      this.addChild(nwHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = (width + event.delta.x)/(width);
        var height = this.target.height * this.target.scale;

        this.target.scale = scale;
        this.target.y += event.delta.y + (height - (height * scale));
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.set({
          x: -Math.round(nwHandle.width),
          y: -Math.round(nwHandle.height)
        });

        seHandle.set({
          x: this.target.width * this.target.scale,
          y: this.target.height * this.target.scale
        });
      }, this));
    }

    return TextHandles;
  }
);
