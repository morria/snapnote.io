define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/elements/Handle'],
  function(_, Easel, Handle) {

    var Handles = function(name) {
        this.initialize();
        this.name = name;
    }

    Handles.prototype = _.extend(new Easel.Container(), {
    });

    return Handles;
  }
);
