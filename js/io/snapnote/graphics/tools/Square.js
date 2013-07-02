define(['Easel'],
  function(Easel) {
    var Square = function() {
        this.graphics.beginFill('#aaa').drawRect(125, 50, 30, 30);
        this.enableMouseOver = true;
        this.mouseEnabled = true;
        this.cursor = 'pointer';

        this.onClick = function(event) {
        }

        this.onTick = function(event) {
            this.x += Math.round((Math.random() * 2) - 1.0);
            this.y += Math.round((Math.random() * 2) - 1.0);
        }
    }

    Square.prototype = new Easel.Shape();

    return Square;
  }
);
