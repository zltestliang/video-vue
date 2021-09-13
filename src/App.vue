<template>
  <div id="app">
    <div style="width: 100%; height: 100vh">
      <video
        style="width: 100%; height: 100%"
        ref="videoPlayer"
        class="video-js"
      ></video>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import 'videojs-logo';
import './videojs/videojs-resolution-switcher/videojs-resolution-switcher.js'
import './videojs/videojs-resolution-switcher/videojs-resolution-switcher.css'
import 'videojs-logo/dist/videojs-logo.css';

console.log(videojs)
export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null,
      videoOptions: {
        // autoplay: true,
        controls: true,
        textTrackDisplay: true,
        plugins: {
          videoJsResolutionSwitcher: {
            default: '高清', // Default resolution [{Number}, 'low', 'high'],
            dynamicLabel: true
          }
        }
        // sources: [
        //   {
        //     src: "http://127.0.0.1:9000/filename.m3u8",
        //   },
        // ],
      },
      
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.videoOptions,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    this.player.logo({
      // image:
      //   "http://127.0.0.1:9000/pthink-logo.png",
      image: require('./assets/douyu.png'),
      opacity: 0.6,
      fadeDelay: null,
      width: 60,
      // offsetH: 10,
      // offsetV: 10
    });

    // this.player.ABP();
    // console.log(this.player.danmu)
    // this.player.danmu.load("http://127.0.0.1:9000/comment.xml");

    console.log(this.player)
    this.player.updateSrc([
      {
        src: 'http://127.0.0.1:8081/filename.m3u8',
        type: 'application/x-mpegURL',
        label: '标清',
        res: 360
      },
      {
        src: 'http://127.0.0.1:8081/zhou.m3u8',
        type: 'application/x-mpegURL',
        label: '高清',
        res: 720
      }
    ])
    // var button = this.player.addChild("button");
    // button.el().innerText = "张梁正在观看视频";
    // console.log(button.el());
    this.addDanmaBtn(this.player);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    addDanmaBtn(player) {
      var Dan = videojs.getComponent("Button");
      var DanButton = videojs.extend(Dan, {
        constructor: function () {
          Dan.apply(this, arguments);
          this.controlText("弹幕");
          console.log(11);
        },
        buildCSSClass: function () {
          return "icon-danmaku vjs-control vjs-button";
        },
        handleClick: function() {
          console.log(111)
          // if (this.danmakuShow) {
          //   danmaku.hide();
          //   this.el_.className += ' off ';
          // } else {
          //   danmaku.show();
          //   this.el_.className = this.el_.className.replace(/off/, '');
          // }
          // danmakuShow = !danmakuShow;
        }
      });
      videojs.registerComponent("DanButton", DanButton);
      player.getChild("controlBar").addChild("DanButton", {}, 3);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.icon-danmaku{
  color: red;
}
.video-js .icon-danmaku .vjs-icon-placeholder{
  font-family: VideoJS;
    font-weight: normal;
    font-style: normal;
}
.video-js .icon-danmaku .vjs-icon-placeholder:before {
    content: "\f107";
}
</style>
