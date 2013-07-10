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
      setUrl: function(url) {
        this._url = url;
      }

      /**
       * @property width
       * @type Number
       */
      width: 0,

      /**
       * @property height
       * @type Number
       */
      height: 0


    });

    var initialize = Image.prototype.initialize;
    Image.prototype.initialize = function(url) {
        initialize.call(this);

        this._bitmap = new Easel.Bitmap(url);
        this.content.addChild(this._bitmap);

        // Draw handles on top of the rectangle
        this.handles.addChild(new Handles());
    }

    return Image;
  }
);
