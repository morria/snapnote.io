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
        var neHandle = new Handle();
        var swHandle = new Handle();
        var seHandle = new Handle();

        var rectangle = _.bind(function() {
            return this.parent.parent;
        }, this);

        // On drag the north-west handle, resize the box
        nwHandle.addEventListener('move', _.bind(function(event) {
            rectangle().x += event.delta.x;
            rectangle().setWidth(rectangle().getWidth() - event.delta.x);
            rectangle().y += event.delta.y;
            rectangle().setHeight(rectangle().getHeight() - event.delta.y);
        }, this));

        // On drag the north-east handle, resize the box
        neHandle.addEventListener('move', _.bind(function(event) {
            rectangle().setWidth(rectangle().getWidth() + event.delta.x);
            rectangle().y += event.delta.y;
            rectangle().setHeight(rectangle().getHeight() - event.delta.y);
        }, this));

        // On drag the south-west handle, resize the box
        swHandle.addEventListener('move', _.bind(function(event) {
            rectangle().x += event.delta.x;
            rectangle().setWidth(rectangle().getWidth() - event.delta.x);
            rectangle().setHeight(rectangle().getHeight() + event.delta.y);
        }, this));

        // On drag the south-east handle, resize the box
        seHandle.addEventListener('move', _.bind(function(event) {
            rectangle().setWidth(rectangle().getWidth() + event.delta.x);
            rectangle().setHeight(rectangle().getHeight() + event.delta.y);
        }, this));

        this.addEventListener('tick', _.bind(function(event) {
            nwHandle.x = -Math.round(nwHandle.width/2);
            nwHandle.y = -Math.round(nwHandle.height/2);

            neHandle.x = rectangle().getWidth() - Math.round(neHandle.width/2);
            neHandle.y = -Math.round(neHandle.height/2);

            swHandle.x = -Math.round(swHandle.width/2);
            swHandle.y = rectangle().getHeight() - Math.round(swHandle.height/2);

            seHandle.x = rectangle().getWidth() - Math.round(seHandle.width/2);
            seHandle.y = rectangle().getHeight() - Math.round(seHandle.height/2);
        }, this));

        this.addChild(nwHandle, neHandle, swHandle, seHandle);
    }

    return RectangleHandles;
  }
);
