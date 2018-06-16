'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_GAP = 50;
var NAMES_FONT_GAP = 20;
var TIME_FONT_GAP = 40;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var INTRO_TEXT_X = 110;
var INTRO_TEXT_Y = 30;
var INTRO_TEXT_LINE_HEIGHT = 20;
var DEFAULT_FONT = '16px PT Mono';
var FONT_BASELINE = 'hanging';
var FONT_FILL_STYLE = 'black';
var PLAYER_NAME = 'Вы';
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';


//  Функция отрисовки цветного текста на координатах
var renderText = function (ctx, x, y, text, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

//  Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//  Функция получения случайного оттенка синего
var getRandomBlueColor = function () {
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

//  Функция отрисовки вступительного текста
var renderTitle = function (ctx) {
  ctx.font = DEFAULT_FONT;
  ctx.textBaseline = FONT_BASELINE;
  renderText(ctx, INTRO_TEXT_X, INTRO_TEXT_Y, 'Ура вы победили!', FONT_FILL_STYLE);
  renderText(ctx, INTRO_TEXT_X, INTRO_TEXT_Y + INTRO_TEXT_LINE_HEIGHT, 'Список результатов:', FONT_FILL_STYLE);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderTitle(ctx);

  var maxTime = getMaxElement(times);
  var leftColumnsGap = (CLOUD_WIDTH - (BAR_WIDTH * names.length + COLUMN_GAP * (names.length - 1))) / 2;

  //  Отрисовка столбиков и текста
  for (var i = 0; i < names.length; i++) {
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var columnX = CLOUD_X + leftColumnsGap + (BAR_WIDTH + COLUMN_GAP) * i;
    var columnY = CLOUD_HEIGHT - barHeight - NAMES_FONT_GAP;

    renderText(ctx, columnX, CLOUD_Y + CLOUD_HEIGHT - NAMES_FONT_GAP, names[i], FONT_FILL_STYLE);
    renderText(ctx, columnX, CLOUD_HEIGHT - barHeight - TIME_FONT_GAP, Math.round(times[i]), FONT_FILL_STYLE);

    var columnColor = getRandomBlueColor();
    if (names[i] === PLAYER_NAME) {
      columnColor = PLAYER_COLUMN_COLOR;
    }

    renderColumn(ctx, columnX, columnY, BAR_WIDTH, barHeight, columnColor);
  }
};
