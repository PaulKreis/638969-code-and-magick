'use strict';
window.renderStatistics = function (ctx, names, times) {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 50;
  var FONT_GAP = 40;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var renderX = 0;
  var renderCloud = function (context, x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', 110, 30);
  ctx.fillText('Список результатов:', 110, 50);
  var maxTime = getMaxElement(times);
  var leftGap = (CLOUD_WIDTH - (BAR_WIDTH * names.length + GAP * (names.length - 1))) / 2;
  for (var i = 0; i < names.length; i++) {
    renderX = CLOUD_X + leftGap + ((BAR_WIDTH + GAP) * i);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], renderX, CLOUD_Y + CLOUD_HEIGHT - 20);
    ctx.fillText(Math.round(times[i]), renderX, CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_GAP);
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(renderX, 250, BAR_WIDTH, -1 * (BAR_HEIGHT * times[i]) / maxTime);
  }
};
