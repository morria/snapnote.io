define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle',
    'io/snapnote/graphics/elements/Handles'],
  function(_, Easel, Handle, Handles) {
    var ArrowHandles = function() {
        this.initialize();
    }

    ArrowHandles.prototype = _.extend(new Handles('rectangle.Handles'), {
    });

    var initialize =
      ArrowHandles.prototype.initialize;

    ArrowHandles.prototype.initialize = function() {
        initialize.call(this);

        var headHandle = new Handle();
        var tailHandle = new Handle();

        var arrow = _.bind(function() {
            return this.parent.parent;
        }, this);

        // On drag the north-west handle, resize the box
        headHandle.addEventListener('move', _.bind(function(event) {
            arrow().x += event.delta.x;
            arrow().y += event.delta.y;
            arrow().setDx(arrow().getDx() - event.delta.x);
            arrow().setDy(arrow().getDy() - event.delta.y);
        }, this));

        // On drag the north-east handle, resize the box
        tailHandle.addEventListener('move', _.bind(function(event) {
            arrow().setDx(arrow().getDx() + event.delta.x);
            arrow().setDy(arrow().getDy() + event.delta.y);
        }, this));

        this.addEventListener('tick', _.bind(function(event) {
            headHandle.x = -Math.round(headHandle.width/2);
            headHandle.y = -Math.round(headHandle.height/2);

            tailHandle.x = arrow().getDx() - Math.round(tailHandle.width/2);
            tailHandle.y = arrow().getDy() - Math.round(tailHandle.height/2);
        }, this));

        this.addChild(headHandle, tailHandle);
    }

    return ArrowHandles;
  }
);
