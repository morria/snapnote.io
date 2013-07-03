define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var SquareHandles = function() {
        this.initialize();

        var nwHandle = new Handle();
        var neHandle = new Handle();
        var swHandle = new Handle();
        var seHandle = new Handle();

        seHandle.addEventListener('move', _.bind(function(event) {
            this.parent.setWidth(this.parent.getWidth() + event.delta.x);
            this.parent.setHeight(this.parent.getHeight() + event.delta.y);
        }, this));

        swHandle.addEventListener('move', _.bind(function(event) {
            console.log(event.delta.x + "\t" + event.delta.y);
            this.parent.x += event.delta.x;
            // this.parent.setWidth(this.parent.getWidth() + event.delta.x);

            this.parent.setHeight(this.parent.getHeight() + event.delta.y);
        }, this));


        this.addEventListener('tick', _.bind(function(event) {
            nwHandle.x = -Math.round(nwHandle.width/2);
            nwHandle.y = -Math.round(nwHandle.height/2);

            neHandle.x = this.parent.getWidth() - Math.round(neHandle.width/2);
            neHandle.y = -Math.round(neHandle.height/2);

            swHandle.x = -Math.round(swHandle.width/2);
            swHandle.y = this.parent.getHeight() - Math.round(swHandle.height/2);

            seHandle.x = this.parent.getWidth() - Math.round(seHandle.width/2);
            seHandle.y = this.parent.getHeight() - Math.round(seHandle.height/2);
        }, this));

        this.addChild(nwHandle, neHandle, swHandle, seHandle);
    }

    SquareHandles.prototype = _.extend(new Handles('square.Handles'), {
    });

    return SquareHandles;
  }
);
