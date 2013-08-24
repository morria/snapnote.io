define([
    'jquery',
    'Underscore'
  ],
  function($, _) {
    $('#link-author').click(trackOutboundEvent);
    $('#link-app').click(trackOutboundEvent);

    /**
     * Interrupt outbound links, tracking the event before
     * going
     */
    function trackOutboundEvent(event) {
      event.preventDefault();

      try {
        ga('send', 'event', 'outbound', $(event.target).data('name'));
      } catch(exception) {}

      setTimeout(function() {
        document.location.href = $(event.target).attr('href');
      }, 100);
    }
  }
);


