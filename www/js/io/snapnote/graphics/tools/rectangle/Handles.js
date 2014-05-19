define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var RectangleHandles = function() {
      this.initialize();
    }

    RectangleHandles.prototype = _.extend(new Handles('rectangle.Handles'), {
    });

    var initialize =
      RectangleHandles.prototype.initialize;

    RectangleHandles.prototype.initialize = function() {
      initialize.call(this);

      var nwHandle = new Handle();
      nwHandle.addEventListener('move', _.bind(function(event) {
        this.target.x += event.delta.x;
        this.target.width -= (event.delta.x / this.target.scale);
        this.target.y += event.delta.y;
        this.target.height -=  (event.delta.y / this.target.scale);
      }, this));
      this.addChild(nwHandle);

      var neHandle = new Handle();
      neHandle.addEventListener('move', _.bind(function(event) {
        this.target.width += (event.delta.x / this.target.scale);
        this.target.y += event.delta.y;
        this.target.height -= (event.delta.y / this.target.scale);
      }, this));
      this.addChild(neHandle);

      var swHandle = new Handle();
      swHandle.addEventListener('move', _.bind(function(event) {
        this.target.x += event.delta.x;
        this.target.width -= (event.delta.x / this.target.scale);
        this.target.height += (event.delta.y / this.target.scale);
      }, this));
      this.addChild(swHandle);

      var seHandle = new Handle();
      seHandle.addEventListener('move', _.bind(function(event) {
        this.target.width += (event.delta.x / this.target.scale);
        this.target.height += (event.delta.y / this.target.scale);
      }, this));
      this.addChild(seHandle);

      this.addEventListener('tick', _.bind(function(event) {
        nwHandle.x = -Math.round(nwHandle.width/2);
        nwHandle.y = -Math.round(nwHandle.height/2);

        neHandle.x = (this.target.width * this.target.scale) - Math.round(neHandle.width/2);
        neHandle.y = -Math.round(neHandle.height/2);

        swHandle.x = -Math.round(swHandle.width/2);
        swHandle.y = (this.target.height * this.target.scale) - Math.round(swHandle.height/2);

        seHandle.x = (this.target.width * this.target.scale) - Math.round(seHandle.width/2);
        seHandle.y = (this.target.height * this.target.scale) - Math.round(seHandle.height/2);
      }, this));
    }

    return RectangleHandles;
  }
);
