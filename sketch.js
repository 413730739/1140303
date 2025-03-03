let input, slider, button, dropdown, urlDiv;
let isBouncing = false;
let bounceFrameCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('✨ ✨ ✨ '); // 創建文字框，預設文字為✨ ✨ ✨
  input.position(10, 10);
  input.input(updateText);
  
  slider = createSlider(25, 50, 30); // 創建滑桿，範圍為25到50，預設值為30
  slider.position(input.x + input.width + 110, 10); // 將滑桿向右移動100
  
  button = createButton('跳動文字'); // 創建按鈕
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放置在滑桿右側
  button.mousePressed(toggleBounce); // 設定按鈕按下時的回調函數
  button.style('background-color', '#ffcad4'); // 設定按鈕背景顏色
  button.style('color', '#9d8189'); // 設定按鈕文字顏色
  button.style('border', '2px solid #9d8189'); // 設定按鈕邊框顏色
  
  dropdown = createSelect(); // 創建下拉選單
  dropdown.position(button.x + button.width + 10, 10); // 將下拉選單放置在按鈕右側
  dropdown.option('主頁', ''); // 添加選項
  dropdown.option('淡江大學', 'https://www.tku.edu.tw/'); // 添加選項
  dropdown.option('第二周', 'https://hackmd.io/@k_uQPxPmRdKuweqHQekgQw/ry2HewK9Jl'); // 添加選項
  dropdown.option('第三周', 'https://hackmd.io/@k_uQPxPmRdKuweqHQekgQw/HJzrJjzjyx'); // 添加選項
  dropdown.changed(openURL); // 設定選項改變時的回調函數
  dropdown.style('background-color', '#ffe5d9'); // 設定下拉選單背景顏色
  dropdown.style('color', '#f4acb7'); // 設定下拉選單文字顏色
  dropdown.style('border', '2px solid #f4acb7'); // 設定下拉選單邊框顏色
}

function draw() {
  background('#d8e2dc');
  textAlign(LEFT, TOP);
  fill('#9d8189');
  
  textSize(25); // 固定 "文字大小" 的文字大小為 25
  text('文字大小', slider.position().x - 100, 15); // 在滑桿左側添加文字
  
  let txt = input.value();
  let textSizeValue = slider.value(); // 根據滑桿的值調整文字大小
  textSize(textSizeValue); // 設定文字大小
  
  let cols = Math.ceil(width / textSizeValue);
  let rows = Math.ceil(height / textSizeValue);
  
  let index = 0;
  for (let j = 2; j < rows; j++) { // 從第三排開始繪製
    for (let i = 0; i < cols; i++) {
      let x = i * textSizeValue;
      let y = j * textSizeValue;
      if (isBouncing) {
        x += sin((frameCount + i * 10) * 0.05) * 10; // S 形扭動效果
        y += cos((frameCount + j * 10) * 0.05) * 10; // S 形扭動效果
      }
      if (index < txt.length) {
        text(txt[index], x, y);
        index++;
      } else {
        index = 0;
        text(txt[index], x, y);
        index++;
      }
    }
  }
  bounceFrameCount++;
}

function updateText() {
  // This function is called whenever the input value changes
}

function toggleBounce() {
  isBouncing = !isBouncing; // 切換跳動狀態
}

function openURL() {
  let url = dropdown.value();
  if (url) {
    if (!urlDiv) {
      urlDiv = createDiv(''); // 創建顯示網址的框框
      urlDiv.position(10, 50); // 設定框框位置
      urlDiv.style('background-color', '#ffffff'); // 設定框框背景顏色
      urlDiv.style('border', '2px solid #9d8189'); // 設定框框邊框顏色
      urlDiv.style('padding', '10px'); // 設定框框內邊距
      urlDiv.style('width', 'calc(100% - 20px)'); // 設定框框寬度
      urlDiv.style('height', 'calc(100% - 70px)'); // 設定框框高度
      urlDiv.style('overflow', 'auto'); // 設定框框內容可滾動
    }
    urlDiv.html(`<iframe src="${url}" width="100%" height="100%"></iframe>`); // 在框框中顯示網址內容
  } else {
    if (urlDiv) {
      urlDiv.remove(); // 移除框框
      urlDiv = null;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
