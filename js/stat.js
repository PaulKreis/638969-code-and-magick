'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 40;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var TEXT_X = 110;
var TEXT_Y = 30;
var FONT_NAME = '16px PT Mono';
var FONT_BASELINE = 'hanging';
var FONT_FILL_STYLE = 'black';
var YOUR_NAME = 'Вы';
var YOUR_NAME_COLOR = 'rgba(255, 0, 0, 1)';

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = FONT_NAME;
  ctx.textBaseline = FONT_BASELINE;
  ctx.fillStyle = FONT_FILL_STYLE;
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + 20);
  var maxTime = getMaxElement(times);
  var leftGap = (CLOUD_WIDTH - (BAR_WIDTH * names.length + GAP * (names.length - 1))) / 2;
  //  Функция отрисовки цветного текста на координатах
  var renderText = function (textContent, textX, textY, textColor) {
    ctx.fillStyle = textColor;
    ctx.fillText(textContent, textX, textY);
  };
  // Функция отрисовки столбика гистограммы заданного цвета
  var renderGisto = function (gistoX, gistoY, gistoWidth, gistoHeight, gistoColor) {
    if (gistoColor === 'rnd') {
      ctx.fillStyle = rndColor();
    } else {
      ctx.fillStyle = gistoColor;
    }
    ctx.fillRect(gistoX, gistoY, gistoWidth, gistoHeight);
  };
  //  Отрисовка столбиков и текста
  var renderX = 0;
  for (var i = 0; i < names.length; i++) {
    renderX = CLOUD_X + leftGap + ((BAR_WIDTH + GAP) * i);
    renderText(names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, FONT_FILL_STYLE);
    if (names[i] === YOUR_NAME) {
      renderText(names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, YOUR_NAME_COLOR);
    } else {
      renderText(names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, FONT_FILL_STYLE);
    }
    renderText(Math.round(times[i]), renderX, CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_GAP, FONT_FILL_STYLE);
    renderGisto(renderX, 250, BAR_WIDTH, -1 * (BAR_HEIGHT * times[i]) / maxTime, 'rnd');
  }
};

var renderCloud = function (context, x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var rndColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
