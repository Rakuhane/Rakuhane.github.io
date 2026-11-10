# 手机端电子日记网站

这是一个可以直接部署到 GitHub Pages 的纯 HTML/CSS/JavaScript 日记网站。

## 文件结构

```text
diary-site/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── 001.jpg
    ├── 002.jpg
    ├── 003.jpg
    └── music.mp3   # 可选
```

## 最简单的使用方法

1. 把整个文件夹上传到 GitHub 仓库。
2. GitHub 仓库进入 Settings → Pages。
3. Build and deployment 选择：
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
4. 保存后等待部署。
5. 打开 `https://你的用户名.github.io/仓库名/`

如果仓库叫 `你的用户名.github.io`，网址就是：
`https://你的用户名.github.io/`

## 修改日记

打开 `script.js`，找到：

```js
const diaryData = [
  ...
];
```

每一篇格式：

```js
{
  date: "2026 / 11 / 10",
  title: "今天发生的事情",
  image: "assets/004.jpg",
  text: "这里写正文。\n换行直接用 \\n。",
  note: "这里是小字备注"
}
```

然后把图片放到 `assets/004.jpg`。

## 图片建议

手机网站建议使用 JPG/WebP。

如果照片原图很大，建议先压缩。比如 8K 原图没有必要全部直接放进网页，否则加载会很慢。

推荐单张：
- 普通照片：约 1–3 MB
- 特别大的原图：先压缩到 2000–3000 px 长边
- 网站封面/背景：根据实际显示尺寸单独压缩

## 音乐

把 MP3 命名为：

`assets/music.mp3`

然后点击右上角 ♫ 即可播放。

浏览器通常禁止网页自动播放声音，所以这里设计成用户主动点击播放。

## 想增加更多彩蛋

可以继续在 `script.js` 里增加：
- 点击某张图片出现隐藏文字
- 输入密码后显示隐藏页面
- 某一天点击特定位置出现小动画
- 最后一页播放特殊动画
- 纪念日倒计时
- “第 X 天认识你”计数器
- 随机飘落的小爱心
- 夜间模式
