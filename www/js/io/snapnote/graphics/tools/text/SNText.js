define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/text/Handles'],
  function(_, Easel, StageObject, Handles) {
    var SNText = function(text, font, color) {
        this.initialize(text, font, color);
    }

    SNText.prototype = _.extend(new Easel.Text(), {
    });

    var initialize = SNText.prototype.initialize;
    SNText.prototype.initialize = function(text, font, color) {
        initialize.call(this);
        this.text = text;
        this.font = font;
        this.color = color;
    }

    var draw = SNText.prototype.draw;
    SNText.prototype.draw = function(ctx, ignoreCache) {
        draw.call(this,  ctx, ignoreCache);
    }

    return SNText;
  }
);
