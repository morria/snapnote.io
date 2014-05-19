define([
    'jquery',
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/image/Handles'],
  function($, _, Easel, StageObject, Handles) {

    var SImage = function(url) {
        this.initialize(url);
    }

    SImage.prototype = _.extend(new StageObject(), {
      /**
       * @property name
       * @type String
       */
      name: 'SImage',

      /**
       * @property url
       * @type String
       */
      getUrl: function() { return this._url; },

      /**
        * @property width
        * @type Number
        */
      getWidth: function() {
        return this._bitmap.image.width;
      },

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
      getScale: function() { return this.content.scaleX; },
      setScale: function(scale) {
        this.content.scaleX = Math.max(scale, 0);
        this.content.scaleY = Math.max(scale, 0);
      },

      /**
       * Don't allow shadows on images
       */
      shadow: null,
      setShadowColor: function(color) {
        this._shadowColor = color;
      },

      update: function() {
        // Nothing to do
      },

      _onLoad: function(event) {

        // Make sure its not too wide
        if ((this.width * this.scale) > this.stage.width) {
          this.scale *= (this.stage.width/this.width);
        }

        // Or too tall
        if ((this.height * this.scale) > this.stage.height) {
          this.scale *= (this.stage.height/(this.height * this.scale));
        }

        // Or falling off the screen
        if (this.x + (this.width * this.scale) > this.stage.width) {
          this.x =
            (this.stage.width - (this.width * this.scale));
        }

        if (this.y + (this.height * this.scale) > this.stage.height) {
          this.y =
            (this.stage.height - (this.height * this.scale));
        }
      }
    });

    var initialize = SImage.prototype.initialize;
    SImage.prototype.initialize = function(url) {
      initialize.call(this);

      this._url = url;

      Object.defineProperty(this, 'url', {
        get: this.getUrl.bind(this)
      });

      this.addEventListener('load', _.bind(this._onLoad, this));

      // Start loading the image
      var image = new Image();
      $(image).load(_.bind(function() {
        this.dispatchEvent({
          type: 'load',
          image: this
        });
      }, this));

      this._bitmap = new Easel.Bitmap(image);

      this.content.addChild(this._bitmap);

      this.handles.addChild(new Handles());

      // Start loading the image
      image.src = this.url;
    }

    return SImage;
  }
);
