define([
    'Underscore',
    'Easel'],
  function(_, Easel) {
    var StageObject = function(name) {
        this.initialize();
        this.name = name;

        this.addEventListener('mouseover', _.bind(function() {
            console.log('here');
            this.canvas.style.cursor = 'pointer';
        }, this));

/*
        this.content.addEventListener('mousedown', _.bind(function(event) {
            var offset = {
                x: event.target.x - event.stageX,
                y: event.target.y - event.stageY
            };

            event.addEventListener('mousemove', _.bind(function(event) {
                event.target.x = event.stageX + offset.x;
                event.target.y = event.stageY + offset.y;
                event.target.getStage().update();
            }, this));
        }, this));
*/

    }

    StageObject.prototype = _.extend(new Easel.Container(), {
    });

    return StageObject;
  }
);
