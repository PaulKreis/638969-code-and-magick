'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var generateName = function () {
  var firstName = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var lastName = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var cColor = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eColor = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var getRandom = function (dataRnd) {
    return dataRnd[Math.floor(Math.random() * dataRnd.length)];
  };
  var character = {
    name: getRandom(firstName) + ' ' + getRandom(lastName),
    coatColor: getRandom(cColor),
    eyesColor: getRandom(eColor)
  };

  return character;
};

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
// Что это за 2 строки????
    .content
    .querySelector('.setup-similar-item');
// ????

for (var i = 0; i < 4; i++) {
  var wizardObject = generateName();
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;
  similarListElement.appendChild(wizardElement);
}
