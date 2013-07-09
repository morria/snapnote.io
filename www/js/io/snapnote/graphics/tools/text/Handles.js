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

    var initialize =
      TextHandles.prototype.initialize;

    TextHandles.prototype.initialize = function() {
        initialize.call(this);

        var nwHandle = new Handle();
        var seHandle = new Handle();

        var parent = _.bind(function() {
            return this.parent.parent;
        }, this);

        function setParentScale(scale) {
            parent().content.scaleX *= scale;
            parent().content.scaleY *= Math.abs(scale);
        }

        // On drag the north-west handle, resize the box
        nwHandle.addEventListener('move', _.bind(function(event) {
            // Scale in the X dimension
            var width = parent().width() * parent().content.scaleX;
            var scaleX = (width - event.delta.x)/(width);

            // Lets preserve the aspect ratio
            setParentScale(scaleX);

            parent().x += event.delta.x;
            parent().y += event.delta.y;
        }, this));

        // On drag the south-east handle, resize the box
        seHandle.addEventListener('move', _.bind(function(event) {
            // Scale in the X dimension
            var width = parent().width() * parent().content.scaleX;
            var scaleX = (width + event.delta.x)/(width);

            var height = parent().height() * parent().content.scaleX;

            // Lets preserve the aspect ratio
            setParentScale(scaleX);

            parent().y += event.delta.y + (height - (height * scaleX));
        }, this));

        this.addEventListener('tick', _.bind(function(event) {
            nwHandle.x = -Math.round(nwHandle.width);
            nwHandle.y = -Math.round(nwHandle.height);

            var width = parent().width() * parent().content.scaleX;

            var height = parent().height() * parent().content.scaleY;

            seHandle.x = width - 0 * Math.round(seHandle.width/2);
            seHandle.y = height - 0 * Math.round(seHandle.height/2);
        }, this));

        this.addChild(nwHandle, seHandle);
    }

    return TextHandles;
  }
);
