define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/text/Handles'],
  function(_, Easel, StageObject, Handles) {

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
                new Easel.Text(this.text,
                  '22px Helvetica, Arial, Sans',
                  'rgba(100, 100, 100, 1.0)');
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

        onSelectHook: function() {
            // this.textBox.visible = false;
        },

        onDeselectHook: function() {
            this.textBox.visible = true;
        }

    });

    var initialize =
        Text.prototype.initialize;

    Text.prototype.initialize = function(text) {
        initialize.call(this);

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
