'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 40;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var INTRO_TEXT_X = 110;
var INTRO_TEXT_Y = 30;
var DEFAULT_FONT = '16px PT Mono';
var FONT_BASELINE = 'hanging';
var FONT_FILL_STYLE = 'black';
var PLAYER_NAME = 'Вы';
var PLAYER_NAME_COLOR = 'rgba(255, 0, 0, 1)';

//  Функция отрисовки цветного текста на координатах
var renderText = function (ctx, textContent, textX, textY, textColor) {
  ctx.fillStyle = textColor;
  ctx.fillText(textContent, textX, textY);
};

//  Функция отрисовки облака
var renderCloud = function (context, x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//  Функция получения случайного оттенка синего
var getRndColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
};

//  Функция поиска игрока с наибольшим количеством очков
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Функция отрисовки столбика гистограммы заданного цвета
var renderColumn = function (ctx, X, Y, Width, Height, Color) {
  ctx.fillStyle = Color;
  ctx.fillRect(X, Y, Width, Height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = DEFAULT_FONT;
  ctx.textBaseline = FONT_BASELINE;
  renderText(ctx, 'Ура вы победили!', INTRO_TEXT_X, INTRO_TEXT_Y, FONT_FILL_STYLE);
  renderText(ctx, 'Список результатов:', INTRO_TEXT_X, INTRO_TEXT_Y + 20, FONT_FILL_STYLE);
  var maxTime = getMaxElement(times);
  var leftGap = (CLOUD_WIDTH - (BAR_WIDTH * names.length + COLUMN_GAP * (names.length - 1))) / 2;

  //  Отрисовка столбиков и текста
  var renderX = 0;
  for (var i = 0; i < names.length; i++) {
    renderX = CLOUD_X + leftGap + ((BAR_WIDTH + COLUMN_GAP) * i);
    renderText(ctx, names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, FONT_FILL_STYLE);
    if (names[i] === PLAYER_NAME) {
      renderText(ctx, names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, PLAYER_NAME_COLOR);
    } else {
      renderText(ctx, names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20, FONT_FILL_STYLE);
    }
    renderText(ctx, Math.round(times[i]), renderX, CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_GAP, FONT_FILL_STYLE);
    renderColumn(ctx, renderX, 250, BAR_WIDTH, -1 * (BAR_HEIGHT * times[i]) / maxTime, getRndColor());
  }
};
