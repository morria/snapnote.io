define([
    'Underscore',
    'Easel'],
  function(_, Easel) {
    var StageObject = function(name) {
        this.initialize(name);
    }

    StageObject.prototype = _.extend(new Easel.Container(), {
        select: function() {
            this.getStage().deselectAllChildren();
            this._selected = true;
            this.handles.visible = true;
            this.getStage().update();
        },

        deselect: function() {
            this._selected = false;
            this.handles.visible = false;
            this.getStage().update();
        },

        isSelected: function() {
            return this._selected;
        }
    });

    var initialize =
        StageObject.prototype.initialize;

    StageObject.prototype.initialize = function(name) {
        initialize.call(this);
        this.name = name;

        this._selected = false;

        this.content = new Easel.Container();
        this.addChild(this.content);

        this.handles = new Easel.Container();
        this.handles.visible = false;
        this.addChild(this.handles);

        this.content.addEventListener('mousedown', _.bind(function(event) {
            this.select();

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

    /**
     * Redirect addChild to the content panel
     */
    /*
    StageObject.prototype.addChild = function() {
        this.content.addChild.apply(this, arguments);
    }

    StageObject.prototype.addChildAt = function() {
        this.content.addChildAt.apply(this, arguments);
    }

    StageObject.prototype.removeChild = function() {
        this.content.removeChild.apply(this, arguments);
    }

    StageObject.prototype.removeChildAt = function() {
        this.content.removeChildAt.apply(this, arguments);
    }
    */


    return StageObject;
  }
);
