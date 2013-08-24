<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <title><?= $host_name ?> - Annotate and Share Images and Screenshots</title>
    <meta name="description" content="<?= $host_name ?> - Annotate and Share Images and Screenshots" />
    <meta name="viewport" content="width=device-width" />
    <meta property="og:title" content="<?= $host_name ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="<?= $host_name ?> - Annotate and Share Image and Screenshots" />
    <meta property="og:site_name" content="<?= $host_name ?>" />
    <meta property="fb:admins" content="209372" />
    <meta property="og:image" content="" />
    <meta itemprop="name" content="<?= $host_name ?>" />
    <meta itemprop="description" content="<?= $host_name ?> - Annotate and Share Images and Screenshots" />
    <link rel="icon" type="image/png" href="img/icon.png" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/view.<?= $css['suffix'] ?>" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/mobile/view.<?= $css['suffix'] ?>"
      type="text/css"
      media="screen and (max-width: 630px)" />
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
          <a class="logo" href="/"><?= $host_name ?></a>
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
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-42413186-1', 'snapnote.io');
      ga('send', 'pageview', '/view');
    </script>
    <!--
    <?php if (ENVIRONMENT == 'development') { ?>
      <script src="js/vendor/require.js" data-main="js/view"></script>
    <?php } else { ?>
      <script src="js/view.min.js"></script>
    <?php } ?>
    -->
  </body>
</html>
