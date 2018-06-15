'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_GAP = 50;
var COLUMN_Y = 250;
var NAMES_FONT_GAP = 20;
var TIME_FONT_GAP = 40;
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
var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

//  Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
var renderColumn = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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
  for (var i = 0; i < names.length; i++) {
    var columnX = CLOUD_X + leftGap + (BAR_WIDTH + COLUMN_GAP) * i;

    if (names[i] === PLAYER_NAME) {
      var textColor = PLAYER_NAME_COLOR;
    } else {
      textColor = FONT_FILL_STYLE;
    }
    renderText(ctx, names[i], columnX, CLOUD_Y + CLOUD_HEIGHT - NAMES_FONT_GAP, textColor);
    renderText(ctx, Math.round(times[i]), columnX, CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime) - TIME_FONT_GAP, FONT_FILL_STYLE);
    renderColumn(ctx, columnX, COLUMN_Y, BAR_WIDTH, -1 * (BAR_HEIGHT * times[i]) / maxTime, getRndColor());
  }
};
