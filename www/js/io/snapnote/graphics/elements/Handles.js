define(['Underscore', 'Easel'],
  function(_, Easel) {

    var Handles = function(name) {
      this.initialize(name);
    }

    Handles.prototype = _.extend(new Easel.Container(), {
      _deviceCanvasPixelRatio: 1.0,

      /**
       * @property this.target
       * @type StageObject
       */
      getTarget: function() {
        return this.parent.parent;
      },

      /**
       * The ratio of physical device pixels per canvas pixel. This
       * is how we account for retina displays.
       */
      getDeviceCanvasPixelRatio: function() {
        return this._deviceCanvasPixelRatio;
      },
      setDeviceCanvasPixelRatio: function(deviceCanvasPixelRatio) {
        this._deviceCanvasPixelRatio = deviceCanvasPixelRatio;

        // Propagate the ratio to all children
        _.each(this.children, function(handle, i) {
          handle.deviceCanvasPixelRatio = deviceCanvasPixelRatio;
        });
      }
    });

    var initialize =
      Handles.prototype.initialize;

    Handles.prototype.initialize = function(name) {
      initialize.call(this);
      this.name = name;

      Object.defineProperty(this, 'target', {
        get: _.bind(this.getTarget, this)
      });
      Object.defineProperty(this, 'deviceCanvasPixelRatio', {
        get: this.getDeviceCanvasPixelRatio.bind(this),
        set: this.setDeviceCanvasPixelRatio.bind(this)
      });
    }

    return Handles;
  }
);
