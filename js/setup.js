'use strict';

var WIZARDS_NUMBER = 4;

var WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomData = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateName = function () {
  return getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_LAST_NAMES);
};

var generateCharacter = function () {
  var character = {
    name: generateName(),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  };
  return character;
};

var generateWizards = function (wizardsNumber) {
  for (var i = 0; i < wizardsNumber; i++) {
    var wizardObject = generateCharacter();
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;
    similarListElement.appendChild(wizardElement);
  }
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

generateWizards(WIZARDS_NUMBER);
