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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

//  #14 Учебный проект: одеть Надежду

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardName = setup.querySelector('.setup-user-name');

//  Открытие/закрытие окна настройки персонажа
wizardName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

wizardName.addEventListener('focusout', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//  Изменение цвета мантии персонажа по нажатию
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name="coat-color"');
wizardCoat.addEventListener('click', function () {
  var newCoatColor = getRandomData(COAT_COLORS);
  wizardCoat.style.fill = newCoatColor;
  wizardCoatInput.value = newCoatColor;
});

//  Изменение цвета глаз персонажа по нажатию
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"');
wizardEyes.addEventListener('click', function () {
  var newEyesColor = getRandomData(EYES_COLORS);
  wizardEyes.style.fill = newEyesColor;
  wizardEyesInput.value = newEyesColor;
});

//  Изменение цвета фаерболов по нажатию
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setup.querySelector('input[name="fireball-color"');
wizardFireball.addEventListener('click', function () {
  var newFireballColor = getRandomData(FIREBALL_COLORS);
  wizardFireball.style.background = newFireballColor;
  wizardFireballInput.value = newFireballColor;
});

closePopup();
