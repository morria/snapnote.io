define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/text/Handles',
    'io/snapnote/graphics/tools/text/Cursor',
    'io/snapnote/graphics/tools/text/SNText'],
  function(_, Easel, StageObject, Handles, Cursor, SNText) {

    var Text = function(text) {
        this.initialize(text);
    }

    Text.prototype = _.extend(new StageObject('Text'), {
        redraw: function() {
            if (this.cursor) {
                this.cursor.setVisible(false);
            }
            this.content.removeAllChildren();

            // The rendered Text Box
            this.textBox =
                new SNText(this.text,
                  '22px Helvetica, Arial, Sans',
                  'rgba(100, 100, 100, 1.0)');

            this.measureText.call(this);

            this.cursor = new Cursor(this.lineHeight());
            this.content.addChild(this.cursor);

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

            var j = 0;
            for(var i = 0; i <= this.text.length; i++) {
                var metrics =
                    context.measureText(this.text.slice(0, i));

                if (width !== null) {
                    this._offsetCoordinates[j] = {
                        x: width - dx,
                        y: dy,
                        dx: metrics.width - width,
                        dy: this._lineHeight
                    };

                    var highlight = new Easel.Shape();
                    highlight.graphics
                        .beginFill('#ffa')
                        .drawRect(
                          this._offsetCoordinates[j].x,
                          this._offsetCoordinates[j].y,
                          this._offsetCoordinates[j].dx,
                          this._offsetCoordinates[j].dy);
                    this.highlight.addChild(highlight);

                    this._width = Math.max(this._width, width - dx);
                    this._height = dy + this._lineHeight;
                    ++j;
                }

                if (this.text[i] == "\n") {
                  dy += this._lineHeight;
                  dx = context.measureText(this.text.slice(0, i+1)).width;
                }

                width = metrics.width;
            }
        },

        setCursorPosition: function(offset) {

            var after = false;

            if (offset >= this._offsetCoordinates.length) {
                offset = this._offsetCoordinates.length - 1;
                after = true;
            } else if (offset < 0) {
                offset = 0;
            }

            this._cursorPosition = offset;

            var offsetCoordinates =
              this._offsetCoordinates[offset];

            this.cursor.x = offsetCoordinates.x + (after ? offsetCoordinates.dx : 0);
            this.cursor.y = offsetCoordinates.y;
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
            this.cursor.setVisible(true);
            this.highlight.visible = true;
            this.getStage().update();

            var previousEvents = $(window).data('events');
            this.storedWindowKeydownListeners =
              (!previousEvents || 'undefined' == typeof previousEvents['keydown']) ? [] : previousEvents['keydown'];

            $(window).unbind('keydown');

            console.log(this.storedWindowKeydownListeners);

            // Listen for key presses
            $(window).keydown(_.bind(function(event) {
                console.log(event);
                console.log(event.keyCode);
                switch(event.keyCode) {
                    case 37: // left
                      this.setCursorPosition(this._cursorPosition - 1);
                      break;
                    case 39: //right
                      this.setCursorPosition(this._cursorPosition + 1);
                      break;
                    case 8: // delete
                      event.preventDefault();
                      this.text =
                        this.text.slice(0, this._cursorPosition - 1)
                        + this.text.slice(this._cursorPosition);
                      this.redraw();
                      this.setCursorPosition(this._cursorPosition - 1);
                      break;
                    case 32:
                      event.preventDefault();
                    default: // ascii key
                      this.text =
                        this.text.slice(0, this._cursorPosition)
                        + String.fromCharCode(event.keyCode)
                        + this.text.slice(this._cursorPosition);
                      this.redraw();
                      this.setCursorPosition(this._cursorPosition + 1);
                }

                this.getStage().update();

            }, this));

        },

        onDeselectHook: function() {
            this.cursor.setVisible(false);
            this.highlight.visible = false;
            this.getStage().update();

            $(window).unbind('keydown');
            $(window).bind('keydown',
              this.storedWindowKeydownListeners);
        }
    });

    var initialize = Text.prototype.initialize;
    Text.prototype.initialize = function(text) {
        initialize.call(this);
        this.name = "Text";

        this._width = 0;
        this._height = 0;
        this._lineHeight = 0;
        this._offsetCoordinates = [];
        this._cursorPosition = null;

        // The text to be displayed
        this.text = text;

        // Draw the text
        this.redraw();

        this.highlight.visible = false;
        this.cursor.setVisible(false);

        // Draw handles on top of the rectangle
        this.handles.addChild(new Handles());

        this.setCursorPosition(this.text.length + 1);
    }

    return Text;
  }
);
