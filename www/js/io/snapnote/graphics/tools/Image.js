define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/image/Handles'],
  function(_, Easel, StageObject, Handles) {

    var Image = function(url) {
        this.initialize(url);
    }

    Image.prototype = _.extend(new StageObject('Image'), {
      /**
       * @property url
       * @type String
       */
      getUrl: function() { return this._url; },

      /**
        * @property width
        * @type Number
        */
      getWidth: function() { return this._bitmap.image.width; },
      setWidth: function(width) {
        this._bitmap.image.width = Math.max(width, 0);
      },

      /**
        * @property height
        * @type Number
        */
      getHeight: function() { return this._bitmap.image.height; },
      setHeight: function(height) {
        this._bitmap.image.height = Math.max(height, 0);
      },

      /**
        * @property scale
        * @type Number
        */
      getScale: function() { return this._bitmap.scaleX; },
      setScale: function(scale) {
        this._bitmap.scaleX = Math.max(scale, 0);
        this._bitmap.scaleY = Math.max(scale, 0);
      }
    });

    var initialize = Image.prototype.initialize;
    Image.prototype.initialize = function(url) {
      initialize.call(this);

      this._url = url;

      this.__defineGetter__('url', _.bind(this.getUrl, this));
      this.__defineGetter__('width', _.bind(this.getWidth, this));
      this.__defineSetter__('width', _.bind(this.setWidth, this));
      this.__defineGetter__('height', _.bind(this.getHeight, this));
      this.__defineSetter__('height', _.bind(this.setHeight, this));
      this.__defineGetter__('scale', _.bind(this.getScale, this));
      this.__defineSetter__('scale', _.bind(this.setScale, this));

      this._bitmap = new Easel.Bitmap(url);
      this.content.addChild(this._bitmap);

      this.handles.addChild(new Handles());
    }

    return Image;
  }
);
