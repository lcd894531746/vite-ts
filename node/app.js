const Stream = require("node-rtsp-stream"); // 引入node-rtsp-stream模块,rtsp/rtmp转码工具
const express = require("express"); // 引入express模块，http模块封装了http协议
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

// 设置ffmpeg路径
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const app = express(); // 创建一个express实例,提供http服务

// ws流使用端口列表
let PostList = [];
/* **************************************************api************************************************ */
/* 关闭组件进程未关闭 */
// Name of the stream, used to identify it in the API
// 定义接口

/* 清除某一端口任务 */
app.get("/cleraWsPort", (req, res) => {
  let query = req.query;
  if (PostList.length == 0) {
    res.send({ status: "success", message: "未找到该端口" });
    return;
  }
  PostList.forEach((element, index) => {
    if (element.port == query.port) {
      element.stream.stop();
      PostList.splice(index, 1);
      res.send({ status: "success", message: "关闭成功：" + port });
    } else {
      res.send({ status: "success", message: "未找到该端口" });
    }
  });
});

/* 清空所有端口任务 */
app.get("/cleraWsAll", async (req, res) => {
  for (let index = 0; index < PostList.length; index++) {
    await PostList[index].stream.stop();
  }
  PostList = [];
  console.log("PostList->>>", PostList);
  res.send({ status: "success", message: "已清空所有端口" });
});

/* rtmp、rtsp转weboscket流 */
app.get("/rtmpToWebsocket", async (req, res) => {
  let query = req.query; // 获取请求参数
  query.rtmpUrl =
    "rtsp://rtspstream:nMV-K3zJQMc-WOBC7-x2-@zephyr.rtsp.stream/traffic";
  query.name = "traffic";

  // 获取该端口是否已经存在，存在则返回该端口，不存在则创建可用端口
  for (let index = 0; index < PostList.length; index++) {
    const element = PostList[index];
    /* 判断已记录的stream是否中断（stream.exitCode）？如果中断则执行stop命令结束端口占用 */
    if (element.stream.stream && element.stream.stream.exitCode !== null) {
      element.stream.stop();
      PostList.splice(index, 1);
      continue;
    }
    /* 判断记录的视频中是否存在请求视频，如果存在则已存在推流，将记录中的websocket端口返回 */
    if (
      element.url === query.rtmpUrl &&
      element.stream.stream &&
      element.stream.stream.exitCode === null
    ) {
      /* 存在则返回该端口 */
      return res.send({
        status: "success",
        port: element.port,
        wsPath: element.name,
        message: "已存在该端口",
        wsUrl: `ws://localhost:${element.port}/${element.name}`,
      });
    }
  }

  try {
    // 动态导入get-port
    const getPort = (await import("get-port")).default;
    // 该视频流未发现，获取可用端口，并进行发布websocket流
    const port = await getPort({
      port: [20000, 20001, 20002, 20003, 20004, 20005],
    }); // 获取可用端口

    // log
    console.log("rtmpUrl->>>", query.rtmpUrl);
    console.log("port->>>", port);
    // 创建一个Stream实例,将rtmpUrl转换为websocket流并发布到（getport）指定的端口
    let stream = new Stream({
      name: query.name,
      streamUrl: query.rtmpUrl,
      wsPort: port,
      wsPath: "/" + query.name,
      ffmpegOptions: {
        "-stats": "",
        "-r": "25",
        "-s": "1280x720",
        "-fflags": "nobuffer",
        "-rtsp_transport": "tcp",
        "-analyzeduration": "10000000",
        "-probesize": "10000000",
        "-an": "", // 禁用音频
      },
      ffmpegPath: ffmpegInstaller.path,
    });

    PostList.push({
      name: query.name,
      port: port,
      url: query.rtmpUrl,
      stream: stream,
    });

    res.send({
      status: "success",
      port,
      wsPath: query.name,
      message: "创建成功",
      wsUrl: `ws://localhost:${port}/${query.name}`,
    });
  } catch (error) {
    console.error("创建流失败:", error);
    res.status(500).send({
      status: "error",
      message: "创建流失败: " + error.message,
    });
  }
});

/* ************************************************http_listen************************************************ */
// 监听3000端口
app.listen(9001, () => {
  console.log("Server running on http://localhost:9001");
});
