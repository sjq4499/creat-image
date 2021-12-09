<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2021-12-07 14:15:49
 * @LastEditors: sjq
 * @LastEditTime: 2021-12-09 13:53:17
-->
<template>
  <n-space justify="space-around" size="large" v-if="!fileUrl">
    <n-upload
      action=""
      :default-file-list="fileList"
      list-type="image-card"
      :max="1"
      :customRequest="customRequest"
    >
      点击上传
    </n-upload>
  </n-space>
  <div v-else>
    <n-image
      class="mimg"
      id="img"
      :style="{ filter: `invert(${sliderValue}%)`, width: sliderValue + 'px' }"
      :src="fileUrl"
    />
    <div>
      颜色反转
      <n-slider
        :step="10"
        :format-tooltip="(value) => `${value}%`"
        v-model:value="sliderValue"
      />
    </div>
    <div class="buts">
      <n-space justify="space-around" size="large">
        <n-button type="info" @click="replaceUpload">清空</n-button>
        <n-button type="info" @click="downfile">下载</n-button>
      </n-space>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { NUpload, NImage, NButton, NSlider, NSpace } from "naive-ui";
import { fileToBase64, getImageDimensions } from "@/utils/index.js";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export default defineComponent({
  components: {
    NUpload,
    NImage,
    NButton,
    NSlider,
    NSpace,
  },
  setup() {
    const fileList = ref([]);
    const fileUrl = ref("");
    const imgwh = reactive({
      width: "",
      height: "",
    });
    const sliderValue = ref(0);

    return {
      fileList: fileList,
      fileUrl: fileUrl,
      imgwh: imgwh,
      sliderValue: sliderValue,
      imgurl: ref(""),
      canvasHtml: ref(""),
    };
  },
  methods: {
    customRequest(file) {
      fileToBase64(file.file.file, (data) => {
        this.fileUrl = data;
        getImageDimensions(data).then((res) => {
          this.imgwh = res;
        });
      });
    },
    // 重新上传
    replaceUpload() {
      this.fileUrl = "";
      console.log(this.sliderValue, "sliderValue");
    },
    downfile() {
      domtoimage.toPng(document.querySelector("#img")).then((imgurl) => {
        this.imgurl = imgurl;
        var a = document.createElement("a"); // 创建一个a节点插入的document
        var event = new MouseEvent("click"); // 模拟鼠标click点击事件
        a.download = new Date() * 1; // 设置a节点的download属性值
        a.href = imgurl; // 将图片的src赋值给a节点的href
        a.dispatchEvent(event); // 触发鼠标点击事件
      });
      // window.pageYoffset = 0;
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
      // // html2canvas配置项
      // const options = {
      //   scale: 1,
      //   width: this.imgwh.width,
      //   height: this.imgwh.height,
      //   logging: false, //日志开关，便于查看html2canvas的内部执行流程
      //   scrollY: 0,
      //   scrollX: 0,
      //   useCORS: true, // 【重要】开启跨域配置
      //   allowTaint: false,
      // };
      // console.log(document.querySelector("#img").style);
      // html2canvas(document.querySelector("#img"), options).then((canvas) => {
      //   let imgurl = canvas.toDataURL("image/png");
      //   console.log(imgurl);
      //   this.imgurl = imgurl;
      //   var a = document.createElement("a"); // 创建一个a节点插入的document
      //   var event = new MouseEvent("click"); // 模拟鼠标click点击事件
      //   a.download = new Date() * 1; // 设置a节点的download属性值
      //   a.href = imgurl; // 将图片的src赋值给a节点的href
      //   // a.dispatchEvent(event); // 触发鼠标点击事件
      // });
    },
  },
});
</script>
<style scoped>
.mimg {
  margin: 0 auto;
  filter: invert(50%);
}
</style>
