require.config({
  shim: {
    Easel: {
      exports: 'createjs'
    },
    Underscore: {
      exports: '_'
    }
  },
  paths: {
    Easel: 'vendor/easeljs-0.6.1.min',
    Underscore: 'vendor/underscore-min'
  }
});

require(['jquery', 'Underscore'],
  function($, _) {
      $img = $('#image img');
      $img.css('max-height', window.innerHeight - 90);
      $img.css('max-width', window.innerWidth - 20);

      if (!/mobile/i.test(navigator.userAgent)) {
        // When the browser dimensions change, update the
        // stage dimensions
        $(window).resize(_.bind(onResize, this));


        function onResize(event) {
          $img.css('max-height', window.innerHeight - 90);
          $img.css('max-width', window.innerWidth - 20);
        }
      }

      // Highlight (select) the URL for easy copying
      // note: jQuery.select() only works on input
      // and textarea elements
      var element = $('#share-url').get(0);
      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      // Get rid of the URL bar on iOS
      /mobile/i.test(navigator.userAgent) && window.scrollTo(0, 1);
  }
);
