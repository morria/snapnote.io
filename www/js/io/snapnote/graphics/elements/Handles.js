define([
    'Underscore',
    'Easel'],
  function(_, Easel) {

    var Handles = function(name) {
      this.initialize(name);
    }

    Handles.prototype = _.extend(new Easel.Container(), {
      /**
       * @property this.target
       * @type StageObject
       */
      getTarget: function() {
        return this.parent.parent;
      }
    });

    var initialize =
      Handles.prototype.initialize;

    Handles.prototype.initialize = function(name) {
      initialize.call(this);
      this.name = name;

      this.__defineGetter__('target', _.bind(this.getTarget, this));
    }

    return Handles;
  }
);
