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
      // When the browser dimensions change, update the
      // stage dimensions
      $(window).resize(_.bind(onResize, this));

      $img = $('#image img');
      $img.css('max-height', window.innerHeight - 90);
      $img.css('max-width', window.innerWidth - 90);

      function onResize(event) {
        $img.css('max-height', window.innerHeight - 90);
        $img.css('max-width', window.innerWidth - 90);
      }
  }
);
