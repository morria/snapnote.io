define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/text/Handles',
    'easeljs/display/EditableText'],
  function(_, Easel, StageObject, Handles, EditableText) {

    var Text = function(text, font, color) {
      this.initialize(text, font, color);
    }

    Text.prototype = _.extend(new StageObject('Text'), {

      /**
       * @property Name
       * @type String
       */
      name: 'Text',

      /**
       * @property text
       * @type String
       */
      getText: function() { return this._text; },

      /**
       * A CSS font specification such as '42px Helvetica'
       *
       * @property font
       * @type String
       */
      getFont: function() { return this._editableText.font; },
      setFont: function(font) {
        this._editableText.font = font;
        this.update();
      },

      update: function() {
        this._editableText.color = this.color;
      },

      /**
       * Event listener for when the text object
       * is selected on the stage
       */
      _onSelect: function(event) {
        this._editableText.editable = true;
      },

      /**
       * Event listener for when the text object
       * is deselected on the stage
       */
      _onDeselect: function(event) {
        this._editableText.editable = false;

        if (this._editableText.text == '') {
          this.stage.removeStageObject(this);
        }
      },

      /**
       * Listener for when this object is removed from
       * the stage
       */
      _onRemove: function(event) {
        // This must be done so that the cursor is
        // made to stop flashing. This is necessary
        // so that it doesn't keep trying to update
        // once its off the stage
        this._editableText.editable = false;
      },

      /**
       * Event listener for when the EditableText
       * changes text
       */
      _onChange: function(event) {
        this.text = event.text;
        this.width = event.width;
        this.height = event.height;
      }
    });

    var initialize = Text.prototype.initialize;
    Text.prototype.initialize = function(text, font, color) {
      initialize.call(this);

      this._text = null;

      // Hook up function-based getters and setters
      this.__defineGetter__('text', _.bind(this.getText, this));
      this.__defineGetter__('font', _.bind(this.getFont, this));
      this.__defineSetter__('font', _.bind(this.setFont, this));

      // Draw the editable text box
      this._editableText = new EditableText(text, font, color);
      this.content.addChild(this._editableText);

      // Update our internal dimensions and state when
      // the editable text changes
      this._editableText.addEventListener('change',
        _.bind(this._onChange, this));

      // We set the text after adding the event listener
      // so that we can get the first change event
      this._editableText.text = text;
      this._editableText.position = text.length + 1;

      this._editableText.shadow = this.shadow;

      // Listen for this object being selected and
      // deselected on the Stage
      this.addEventListener('select', _.bind(this._onSelect, this));
      this.addEventListener('deselect', _.bind(this._onDeselect, this));
      this.addEventListener('remove', _.bind(this._onRemove, this));

      // Draw handles on top of the rectangle
      this.handles.addChild(new Handles());

      this.text = text;
      this.color = color;
      this.font = font;
    }

    return Text;
  }
);
