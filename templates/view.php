<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <title>snapnote.io - Annotate and Share Images and Screenshots</title>
    <meta name="description" content="snapnote.io - Annotate and Share Images and Screenshots" />
    <meta name="viewport" content="width=device-width" />
    <meta property="og:title" content="snapnote.io" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="snapnote.io - Annotate and Share Image and Screenshots" />
    <meta property="og:site_name" content="snapnote.io" />
    <meta property="fb:admins" content="209372" />
    <meta property="og:image" content="" />
    <meta itemprop="name" content="snapnote.io" />
    <meta itemprop="description" content="snapnote.io - Annotate and Share Images and Screenshots" />
    <link rel="icon" type="image/png" href="img/icon.png" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/view.<?= $css['suffix'] ?>" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/mobile/view.<?= $css['suffix'] ?>"
      type="text/css"
      media="screen and (max-width: 530px)" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <meta name="apple-mobile-web-app-capable"
      content="yes" />
    <?php if (ENVIRONMENT == 'development'):  ?>
      <script type="text/javascript" src="js/vendor/less-1.3.3.min.js"></script>
    <?php endif ?>
  </head>
  <body>
    <header>
      <div class="container">
        <h1>
          <a class="logo" href="/">snapnote.io</a>
        </h1>
        <div id="share">
          <span class="icon icon-send"></span>
          <span id="share-url">
            <a href="<?= $share_url ?>">
              <?= $share_url ?>
            </a>
          </span>
        </div>
        <div id="make">
          <a href="/">
            New Snapnote
          </a>
        </div>
      </div>
    </header>
    <div id="content">
      <div id="image">
        <a href="<?= $url ?>" target="_blank">
          <img src="<?= $url ?>" />
        </a>
      </div>
    </div>
    <?php include 'footer.php' ?>
    <script src="js/vendor/require.js" data-main="js/view"></script>
    <!--
    <?php if (ENVIRONMENT == 'development') { ?>
      <script src="js/vendor/require.js" data-main="js/view"></script>
    <?php } else { ?>
      <script src="js/view.min.js"></script>
    <?php } ?>
    -->
    <script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
    typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
    b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
    mixpanel.init("1f68573a433139e9771f5df6d6e8dd8f");</script>
    <script type="text/javascript">mixpanel.track('view')</script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-42413186-1', 'snapnote.io');
      ga('send', 'pageview');

    </script>
  </body>
</html>
