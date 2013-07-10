define([
    'Underscore',
    'Easel'],
  function(_, Easel) {
    var StageObject = function(name) {
        this.initialize(name);
    }

    StageObject.prototype = _.extend(new Easel.Container(), {
        /**
         * Select this object, deselecting all others
         *
         * @return void
         */
        select: function() {

            // Deselect everyone else
            this.getStage().deselectAllChildren();

            // Mark this as selected
            this._selected = true;

            // Turn the handles on
            this.handles.visible = true;

            // Move the selected element to the top in order to
            // minimize surprise on future grabs
            this.getStage().stageObjectChildren.swapChildren(this,
              this.getStage().stageObjectChildren.getChildAt(
              this.getStage().stageObjectChildren.getNumChildren() - 1));

            // Let the world know I'm selected
            this.dispatchEvent({
              type: 'select'
            }, this);

            // Redraw with my handles on and everyone else's
            // handles off
            this.getStage().update();
        },

        /**
         * Deselect this element
         *
         * @return void
         */
        deselect: function() {
            this._selected = false;
            this.handles.visible = false;

            // Let the world know I'm no longer
            // selected
            this.dispatchEvent({
              type: 'deselect'
            }, this);

            // Redraw the stage with my handles gone
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
