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
    });

    var initialize =
      ImageHandles.prototype.initialize;

    ImageHandles.prototype.initialize = function() {
      initialize.call(this);

      var nwHandle = new Handle();
      nwHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width - event.delta.x)/width;

        this.target.scale *= scale;
        this.target.x -= ((width * scale) - width) ;
        this.target.y -= ((height * scale) - height) ;
      }, this));
      this.addChild(nwHandle);

      var neHandle = new Handle();
      neHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = width/(width - event.delta.x);

        this.target.scale *= scale;
        this.target.y -= ((height * scale) - height) ;
      }, this));
      this.addChild(neHandle);

      var swHandle = new Handle();
      swHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width - event.delta.x)/width;

        this.target.scale *= scale;
        this.target.x += event.delta.x;
      }, this));
      this.addChild(swHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var scale = (width + event.delta.x)/width;
        this.target.scale *= scale;
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.x = 0;
        nwHandle.y = 0;

        neHandle.x = (this.target.width * this.target.scale) - neHandle.width;
        neHandle.y = 0;

        swHandle.x = 0;
        swHandle.y = (this.target.height * this.target.scale) - swHandle.height;

        seHandle.x = (this.target.width * this.target.scale) - seHandle.width;
        seHandle.y = (this.target.height * this.target.scale) - seHandle.height;
      }, this));
    }

    return ImageHandles;
  }
);
