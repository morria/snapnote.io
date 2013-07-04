define([
    'Underscore',
    'Easel'],
  function(_, Easel) {

    var Handles = function(name) {
        this.initialize(name);
    }

    Handles.prototype = _.extend(new Easel.Container(), {
    });

    var initialize =
      Handles.prototype.initialize;

    Handles.prototype.initialize = function(name) {
        initialize.call(this);
        this.name = name;
    }

    return Handles;
  }
);
