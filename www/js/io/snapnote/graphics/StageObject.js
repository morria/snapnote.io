define([
    'Underscore',
    'Easel'],
  function(_, Easel) {
    var StageObject = function(name) {
        this.initialize(name);
    }

    StageObject.prototype = _.extend(new Easel.Container(), {
    });

    var initialize =
        StageObject.prototype.initialize;

    StageObject.prototype.initialize = function(name) {
        initialize.call(this);
        this.name = name;

        this.content = new Easel.Container();
        this.addChild(this.content);

        this.handles = new Easel.Container();
        this.addChild(this.handles);

        this.content.addEventListener('mousedown', _.bind(function(event) {
            var target = event.target.parent;

            var offset = {
                x: target.x - event.stageX,
                y: target.y - event.stageY
            };

            event.addEventListener('mousemove', _.bind(function(event) {
                target.x = event.stageX + offset.x;
                target.y = event.stageY + offset.y;
                target.getStage().update();
            }, this));
        }, this));
    }

    return StageObject;
  }
);
