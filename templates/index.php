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
    <meta property="og:image" content="/img/icon.png" />
    <meta itemprop="name" content="<?= $host_name ?>" />
    <meta itemprop="description" content="<?= $host_name ?> - Annotate and Share Images and Screenshots" />
    <link rel="icon" type="image/png" href="img/icon.png" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/style.<?= $css['suffix'] ?>" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/mobile/tablet.<?= $css['suffix'] ?>"
      type="text/css"
      media="screen and (max-width: 930px)" />
    <link rel="<?= $css['rel'] ?>" type="<?= $css['media'] ?>"
      href="css/mobile/mobile.<?= $css['suffix'] ?>"
      type="text/css"
      media="screen and (max-width: 772px)" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <meta name="apple-mobile-web-app-capable"
      content="yes" />
    <?php if (ENVIRONMENT == 'development'):  ?>
      <script type="text/javascript" src="js/vendor/less-1.3.3.min.js"></script>
    <?php endif ?>
  </head>
  <body <?php if($is_ohsnap): ?>class="ohsnap"<?php endif; ?>>
    <header>
      <div class="container">
      <div id="color-chooser" <?php if(!$is_ohsnap): ?>data-default='#ff4f00'<?php else: ?>data-default="#ea4483"<?php endif; ?>>
          <!--
          --><span class="color" style="background-color: #ff4f00" data-shadow-color="#000"></span><!--
          --><span class="color" style="background-color: #000" data-shadow-color="#666"></span><!--
          --><span class="color" style="background-color: #fff" data-shadow-color="#000"></span><!--
          --><span class="color" style="background-color: #3498DB" data-shadow-color="#000"></span><!--
          --><span class="color" style="background-color: #f1c40f" data-shadow-color="#000"></span><!--
          --><span class="color" style="background-color: #63bc22" data-shadow-color="#000"></span><!--
          --><span class="color" style="background-color: #ea4483" data-shadow-color="#000"></span><!--
          -->
        </div>
        <ul id="tools">
          <li>
            <input type="file" id="tool-image-select" accept="image/*" hidden class="hidden" />
            <button id="tool-image">
              <span class="icon icon-image"></span>
              <label>Upload Image</label>
            </button>
          </li>
          <?php if(!$is_ohsnap): ?>
          <li>
            <button id="tool-arrow">
              <span class="icon icon-arrow"></span>
              <label>Draw Arrow</label>
            </button>
          </li>
          <li>
            <button id="tool-text">
              <span class="icon icon-text"></span>
              <label>Write Text</label>
            </button>
          </li>
          <li>
            <button id="tool-rectangle">
              <span class="icon icon-rectangle"></span>
              <label>Draw Box</label>
            </button>
          </li>
          <li>
            <button class="tool-label" id="tool-label" data-label="This">
              <span class="icon icon-label"></span>
              <label>Add Label</label>
            </button>
          </li>
          <?php else: ?>
            <li>
              <button class="tool-label" id="tool-label-wtf" data-label="WTF">
                <span class="icon icon-label"></span>
                <label>WTF</label>
              </button>
            </li>
            <li>
              <button class="tool-label" id="tool-label-boom" data-label="Boom">
                <span class="icon icon-label"></span>
                <label>Boom</label>
              </button>
            </li>
            <li>
              <button class="tool-label" id="tool-label-oh-snap" data-label="Oh Snap">
                <span class="icon icon-label"></span>
                <label>Oh Snap</label>
              </button>
            </li>
          <?php endif; ?>
        </ul>
        <ul id="evergreen">
          <li>
            <button id="tool-share">
              <span class="icon icon-save"></span>
            </button>
          </li>
        </ul>
      </div>
    </header>
    <div id="dragon-drop-message" style="display: none;">
      <div class="container">
        <label>Upload</label>
      </div>
    </div>
    <div id="blank-slate" class="blank-slate">
      <div class="container">
        <?php if ($is_chrome): ?>
          <label>Drop Or Paste An Image To Annotate</label>
        <?php else: ?>
          <label>Drop An Image To Annotate</label>
        <?php endif ?>
      </div>
    </div>
    <div id="blank-slate-mobile" class="blank-slate">
      <div class="container">
        <label>Add an Image to Annotate</label>
      </div>
    </div>
    <div id="content">
      <canvas id="stage" width="0" height="0" unselectable="on" tabindex="1"
        data-desktop-image-id="<?= $desktop_image_id ?>"></canvas>
    </div>
    <?php include 'footer.php' ?>
    <script src="js/vendor/require.js" data-main="js/main"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-42413186-1', 'snapnote.io');
      ga('send', 'pageview');
      ga('send', 'event', 'page', 'create');
    </script>
    <!--
    <?php if (ENVIRONMENT == 'development') { ?>
      <script src="js/vendor/require.js" data-main="js/main"></script>
    <?php } else { ?>
      <script src="js/vendor/require.js" data-main="js/main.min"></script>
    <?php } ?>
    -->
  </body>
</html>
