# Assets Directory Guide

Place your media files in this folder for the portfolio.

## Structure

```
assets/
├── resume.pdf                <-- Drop your official Resume PDF here
├── projects/                 <-- Drop project photos and diagrams here
│   ├── reflow_oven.jpg       <-- Reflow Oven Controller photo
│   ├── rc_car.jpg            <-- Field-Tracking RC Car photo
│   ├── logic_analyzer.jpg    <-- FPGA DE10-Lite Logic Analyzer photo
│   ├── peft_paper.jpg        <-- Research Paper figure/screenshot
│   └── balancing_robot.jpg   <-- Self-Balancing Robot photo
└── README.md
```

## How to enable images in `projects.html`
In `projects.html`, locate the project card's `.media-placeholder-container` and replace it with:
```html
<div class="media-container">
  <img src="assets/projects/reflow_oven.jpg" alt="Reflow Oven Controller">
</div>
```

## How to embed YouTube or Google Drive Videos
In `projects.html`, locate the project card's `.video-container` and replace the inner content with:
```html
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" title="Demo Video" allowfullscreen></iframe>
</div>
```
Or for local MP4 files:
```html
<div class="video-container">
  <video controls src="assets/projects/demo_video.mp4"></video>
</div>
```
