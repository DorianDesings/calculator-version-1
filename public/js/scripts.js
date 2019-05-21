'use strict';

var screenOperation = document.getElementById('screen-operation');
var screenResult = document.getElementById('screen-result');
var buttons = document.getElementById('buttons');

var operationComplete = false;

var lastValue = function lastValue() {
    return screenOperation.textContent.substring(screenOperation.textContent.length - 1);
};

var writeOperation = function writeOperation(text) {
    if (screenOperation.textContent == '0' && text != '.') screenOperation.textContent = '';

    if (operationComplete && isNaN(text)) {
        screenOperation.textContent = screenResult.textContent;
        operationComplete = false;
    }

    if (operationComplete && !isNaN(text)) {
        screenOperation.textContent = '';
        screenResult.textContent = '0';
        operationComplete = false;
    }

    if (isNaN(lastValue()) && isNaN(text)) {
        screenOperation.textContent = screenOperation.textContent.substring(0, screenOperation.textContent.length - 1);
    } else if (screenOperation.textContent.length < 24) {
        screenOperation.textContent += text;
    }
};

var writeResult = function writeResult() {

    if (isNaN(lastValue()) && lastValue() !== ')') screenOperation.textContent = screenOperation.textContent.substring(0, screenOperation.textContent.length - 1);

    screenResult.textContent = eval(screenOperation.textContent);
    operationComplete = true;

    if (screenResult.textContent.length > 9) {
        screenResult.style.fontSize = '2em';
        screenResult.style.marginTop = '1em';
    }
};

var changeSign = function changeSign() {
    var lastNumber = '';
    var position = 0;

    if (!isNaN(lastValue())) {
        for (var i = screenOperation.textContent.length - 1; i > 0; i--) {
            if (isNaN(screenOperation.textContent[i])) {
                position = i + 1;
                break;
            }
        }
    }

    lastNumber = screenOperation.textContent.substring(position);
    screenOperation.textContent = screenOperation.textContent.replace(lastNumber, '(' + lastNumber * -1 + ')');
};

var resetScreen = function resetScreen() {
    screenOperation.textContent = '0';
    screenResult.textContent = '0';
};

buttons.addEventListener('click', function (e) {
    if (e.target.textContent !== '') {
        switch (e.target.textContent) {
            case '=':
                writeResult();break;
            case 'C':
                resetScreen();break;
            case '+/-':
                changeSign();break;
            case ',':
                writeOperation('.');break;
            default:
                writeOperation(e.target.textContent);break;
        }
    }
});