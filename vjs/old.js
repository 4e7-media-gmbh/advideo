let xhr = new XMLHttpRequest(); // the constructor has no arguments
    xhr.open("GET", "https://ad1.adfarm1.adition.com/banner?sid=3123832&ts=3208062&wpt=X&prf[consent]=optin")
    xhr.send();
    console.log(xhr.response.Creatives)
    a= $(".vast-blocker");
    fetch("https://ad1.adfarm1.adition.com/banner?sid=3123832&ts=3208062&wpt=X&prf[consent]=optin")
      .then(function(resp) {
        return resp.text();
      })
      .then(function(data) {
        let praser= new DOMParser(),
        xmlDoc = praser.parseFromString(data,'text/xml');
        adTagz = xmlDoc.getElementsByTagName("MediaFile")
        advideo = adTagz.item(0).innerHTML.replace("<![CDATA[", "").replace("]]>", "");
        adclick = xmlDoc.getElementsByTagName("ClickThrough");
        click = adclick.item(0).innerHTML.replace("<![CDATA[", "").replace("]]>", "")
        console.log(advideo)
      })
    
    gtag('create', 'UA-23676405-1', 'auto');
	  gtag('send', 'event', 'countrycode', 'test1');
	  gtag('send', 'pageview');	
    var videos = [
      "//notorious-mag.com/sites/default/files/video/notorious_fashion_video_spring19_1.mp4",
      "//notorious-mag.com/sites/default/files/video/ball_dresses_inpiration_2-final-fc.mp4",
      "//www.notorious-mag.com/sites/default/files/MenSpring2019.mp4",
      "//www.notorious-mag.com/sites/default/files/5 powerful women.mp4",
      "//www.notorious-mag.com/sites/default/files/Goddess.mp4",
      "https://www.notorious-mag.com/sites/default/files/4morninghabits.mp4",
      "https://notorious-mag.com/sites/default/files/video/cocktail_ring_v5-1.mp4",
      "https://notorious-mag.com/sites/default/files/curcumin.mp4",
      "https://notorious-mag.com/sites/default/files/20180806_Lagom_ALL_v05comp.mp4",
      "https://notorious-mag.com/sites/default/files/20180702_Elephant_ALL_v04.mp4",
      "https://notorious-mag.com/sites/default/files/emma-stone.mp4",
      "https://notorious-mag.com/sites/default/files/Traina_ALL1.mp4",
      "https://notorious-mag.com/sites/default/files/beach-tips.mp4",
      "https://notorious-mag.com/sites/default/files/coconut_oil.mp4",
      "https://notorious-mag.com/sites/default/files/cannes20161.mp4",
      "https://notorious-mag.com/sites/default/files/Wimbledon.mp4",
      "https://notorious-mag.com/sites/default/files/video/around_dubai_with_guccis_sylvie_bag.mp4",
      "https://notorious-mag.com/sites/default/files/85OYJF1k-C2IFcWJE_0.mp4"

    ]
    /*if (Cookiebot.consented == true){
			con = "optin";
			ga('send', 'event', 'countrycode', 'optedinv');
		}else{
			con = "optout";
			ga('send', 'event', 'countrycode', 'optedoutv');
		}*/
    function getWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    }

    function getHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
    }

    var player = videojs('embedd-player', {
      muted: true,
      controls: true,
      autoplay: true,
      width: getWidth(),
      height: getHeight(),
      sources: [{
        type: "video/mp4",
        src: videos[Math.floor(Math.random() * videos.length)]
      }],
    });
   /* var vastPlugin = player.vastClient({
    adTagUrl: "https://ad1.adfarm1.adition.com/banner?sid=3123832&ts=3208062&wpt=X&prf[consent]=optin",
    playAdAlways: true,
    //Note: As requested we set the preroll timeout at the same place than the adsCancelTimeout
    adsCancelTimeout: 10000,
});*/



player.ads()
    // request ads whenever there's new video content
player.on('contentchanged', function() {
  // in a real plugin, you might fetch new ad inventory here
  fetch("https://ad1.adfarm1.adition.com/banner?sid=3123832&ts=3208062&wpt=X&prf[consent]=optin")
      .then(function(resp) {
        return resp.text();
      })
      .then(function(data) {
        let praser= new DOMParser(),
        xmlDoc = praser.parseFromString(data,'text/xml');
        adTagz = xmlDoc.getElementsByTagName("MediaFile")
        advideo = adTagz.item(0).innerHTML.replace("<![CDATA[", "").replace("]]>", "");
        adclick = xmlDoc.getElementsByTagName("ClickThrough");
        click = adclick.item(0).innerHTML.replace("<![CDATA[", "").replace("]]>", "")
        console.log(click)
      })
  player.trigger('adsready');
});

player.on('readyforpreroll', function() {
  player.ads.startLinearAdMode();
  console.log("start3")
  
  player.src(advideo);

  // send event when ad is playing to remove loading spinner
  player.one('adplaying', function() {
    player.trigger('ads-ad-started');
    console.log("start1")
    $(".vast-blocker").attr("href", click);
  });
  
  // resume content when all your linear ads have finished
  player.on('adended', function() {
    player.ads.endLinearAdMode();
    $(".vast-blocker").attr("href", null);

  });
});

// in a real plugin, you might fetch ad inventory here
player.trigger('adsready');
    player.on('vast.adStart', function () {
      
      player.controls(false)

    })
    player.on('contentStart', function () {
      console.log("start")
      setTimeout(function(){
      player.ads.startLinearAdMode(),player.src(advideo);
    },30000) 
      player.controls(true)
      
    })
    vastPlugin = function (options) {
      var contentUpdateFn = function () {
        player.vast.getContent(settings.url);
      };

      // videojs-ads triggers this when src changes
      player.on('contentupdate', contentUpdateFn);

      player.on('vast-preroll-removed', function () {
        // preroll done or removed, start playing the actual video
        player.play();
        player.controls(true)
        $(".vast-blocker").attr("href", null)
        // remove listener for source changes (allowing source to change w/o pre-roll ad)

      });
    };
    player.on('ended', function () {
      gtag('send', 'event', 'adplayed', 'end');
      player.controls(true)
      player.on('ended', function () {
        location.reload()
      });
    });
    /*player.playlist([{
        sources: [{
        src: "https://notorious-mag.com/sites/default/files/video/around_dubai_with_guccis_sylvie_bag.mp4",
        type: 'video/mp4'
      }],
    },{
        sources: [{
        src: 'https://notorious-mag.com/sites/default/files/85OYJF1k-C2IFcWJE_0.mp4',
        type: 'video/mp4'
      }],
    }]);

    player.playlist.autoadvance(3);
    player.playlist.repeat(true);*/