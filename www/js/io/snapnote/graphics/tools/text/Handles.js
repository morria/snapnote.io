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
            parent().textBox.scaleX *= scale;
            parent().textBox.scaleY *= Math.abs(scale);
            parent().background.scaleX *= scale;
            parent().background.scaleY *= Math.abs(scale);
        }

        // On drag the north-west handle, resize the box
        nwHandle.addEventListener('move', _.bind(function(event) {
            parent().x += event.delta.x;
            parent().y += event.delta.y;

            // Scale in the X dimension
            var width = parent().textBox.getMeasuredWidth()
              * parent().textBox.scaleX;
            var scaleX = (width - event.delta.x)/(width);

            // Lets preserve the aspect ratio
            setParentScale(scaleX);
        }, this));

        // On drag the south-east handle, resize the box
        seHandle.addEventListener('move', _.bind(function(event) {
            parent().y += event.delta.y;

            // Scale in the X dimension
            var width = parent().textBox.getMeasuredWidth()
              * parent().textBox.scaleX;
            var scaleX = (width + event.delta.x)/(width);

            // Lets preserve the aspect ratio
            setParentScale(scaleX);
        }, this));

        this.addEventListener('tick', _.bind(function(event) {
            nwHandle.x = -Math.round(nwHandle.width);
            nwHandle.y = -Math.round(nwHandle.height);

            var width = parent().textBox.getMeasuredWidth() *
              parent().textBox.scaleX;

            var height = parent().textBox.getMeasuredHeight() *
              parent().textBox.scaleY;

            seHandle.x = width - 0 * Math.round(seHandle.width/2);
            seHandle.y = height - 0 * Math.round(seHandle.height/2);
        }, this));

        this.addChild(nwHandle, seHandle);
    }

    return TextHandles;
  }
);
