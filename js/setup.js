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

var generateFullName = function () {
  return getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_LAST_NAMES);
};

var generateCharacter = function () {
  var fullName = {
    fullName: generateFullName(),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  };
  return fullName;
};


var createWizardElement = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var generateWizards = function (wizardsNumber) {
  var wizardFragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsNumber; i++) {
    var wizardObject = generateCharacter();
    wizardFragment.appendChild(createWizardElement(wizardObject));
  }
  return wizardFragment;
};

var initSetup = function () {
  var wizards = generateWizards(WIZARDS_NUMBER);
  var similarListElement = document.querySelector('.setup-similar-list');
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
  similarListElement.appendChild(wizards);
};

initSetup();
