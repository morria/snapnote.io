define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/text/Handles',
    'io/snapnote/graphics/tools/text/SNText'],
  function(_, Easel, StageObject, Handles, SNText) {

    var STROKE_WIDTH = 15;

    var Text = function(text) {
        this.initialize(text);
    }

    Text.prototype = _.extend(new StageObject('Text'), {
        redraw: function() {
            if (this.arrow) {
                this.content.removeChildAt(0);
            }

            // The rendered Text Box
            this.textBox =
                new SNText(this.text,
                  '22px Helvetica, Arial, Sans',
                  'rgba(100, 100, 100, 1.0)');

            this.measureText.call(this);

            // Once we're done measuring, add it to the
            // stage.
            this.content.addChild(this.textBox);

            // An invisible background that gives us
            // a cleaner hit area
            this.background = new Easel.Shape();
            this.background.graphics
                .beginFill('rgba(255, 255, 255, 0.01)')
                .drawRect(0, 0,
                    this.textBox.getMeasuredWidth(),
                    this.textBox.getMeasuredHeight());
            this.content.addChildAt(this.background, 0);
        },

        measureText: function() {
            this.highlight = new Easel.Container();
            this.content.addChild(this.highlight);

            var context = this.textBox._getWorkingContext();

            this._lineHeight =
                this.textBox.getMeasuredLineHeight();

            var width = null;
            var dx = 0;
            var dy = 0;

            for(var i = 0; i <= this.text.length; i++) {
                var metrics =
                    context.measureText(this.text.slice(0, i));

                if (width !== null) {
                    var highlight = new Easel.Shape();
                    highlight.graphics
                        .beginFill('#aaa')
                        .drawRect(
                          width - dx + 1, dy,
                          metrics.width - width - 1, this._lineHeight);
                    this.highlight.addChild(highlight);

                    this._width = Math.max(this._width, width - dx);
                    this._height = dy + this._lineHeight;
                }

                if (this.text[i] == "\n") {
                  dy += this._lineHeight;
                  dx = context.measureText(this.text.slice(0, i+1)).width;
                }

                width = metrics.width;
            }
        },

        width: function() {
            return this._width;
        },

        height: function() {
            return this._height;
        },

        lineHeight: function() {
            return this._lineHeight;
        },

        onSelectHook: function() {
            // this.textBox.visible = false;
        },

        onDeselectHook: function() {
            this.textBox.visible = true;
        }
    });

    var initialize = Text.prototype.initialize;
    Text.prototype.initialize = function(text) {
        initialize.call(this);
        this.name = "Text";

        this._width = 0;
        this._height = 0;
        this._lineHeight = 0;

        // The text to be displayed
        this.text = text;

        // Draw the text
        this.redraw();

        // Draw handles on top of the rectangle
        this.handles.addChild(new Handles());
    }

    return Text;
  }
);
