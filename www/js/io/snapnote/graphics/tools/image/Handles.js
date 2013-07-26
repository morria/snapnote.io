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

        if (scale * width < 1.0 || scale * height < 1.0) {
          return;
        }

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

        if (scale * width < 1.0 || scale * height < 1.0) {
          return;
        }

        this.target.scale *= scale;
        this.target.y -= ((height * scale) - height) ;
      }, this));
      this.addChild(neHandle);

      var swHandle = new Handle();
      swHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width - event.delta.x)/width;

        if (scale * width < 1.0 || scale * height < 1.0) {
          return;
        }

        this.target.scale *= scale;
        this.target.x += event.delta.x;
      }, this));
      this.addChild(swHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        var width = this.target.width * this.target.scale;
        var height = this.target.height * this.target.scale;
        var scale = (width + event.delta.x)/width;

        if (scale * width < 1.0 || scale * height < 1.0) {
          return;
        }

        this.target.scale *= scale;
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.x = -nwHandle.width/3;
        nwHandle.y = -nwHandle.height/3;

        neHandle.x = (this.target.width * this.target.scale) - (2*neHandle.width/3);
        neHandle.y = -swHandle.width/3;

        swHandle.x = -swHandle.width/3;
        swHandle.y = (this.target.height * this.target.scale) - (2*swHandle.height/3);

        seHandle.x = (this.target.width * this.target.scale) - (2*seHandle.width/3);
        seHandle.y = (this.target.height * this.target.scale) - (2*seHandle.height/3);
      }, this));
    }

    return ImageHandles;
  }
);
