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
        try {
          this.getStage().update();
        } catch (exception) {
          console.error(this);
          throw exception;
        }
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

        // Stored from the mousedown moment as a reference point to
        // the offset from the top-left of the object
        var offset = {
          x: target.x - event.stageX,
          y: target.y - event.stageY
        };

        event.addEventListener('mousemove', _.bind(function(event) {
          target.set({
            x: event.stageX + offset.x,
            y: event.stageY + offset.y
          }).getStage().update();
        }, this));
      }, this));
    }

    return StageObject;
  }
);
