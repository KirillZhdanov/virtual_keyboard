const h1 = document.createElement('h1');
h1.innerHTML = 'Virtual Keyboard <br> to change lang use Ctrl+Alt';
document.body.append(h1);
const textarea = document.createElement('textarea');
textarea.id = 'textarea';
textarea.readOnly = 'true';
document.body.append(textarea);
const div = document.createElement('div');
div.className = 'keyboard';
document.body.append(div);
let keyboardLang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : (localStorage.setItem('lang', 'en'), 'en');
let isCaps = false;

let isShift = false;
const keyboardLabelsEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardLabelsEnWithSymbols = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardLabelsRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardLabelsRuWithSymbols = ['ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardValuesEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  '\t', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', '\n',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
  'ControlLeft', '', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
const keyboardValuesEnWithSymbols = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  '\t', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', '\n',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
  'ControlLeft', '', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
const keyboardValuesRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  '\t', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', '\n',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'ControlLeft', '', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
const keyboardValuesRuWithSymbols = ['ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  '\t', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', '\n',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'ControlLeft', '', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
const pressed = new Set();
class Kbrd {
  constructor(codes, values, ID) {
    this.codes = codes;
    this.values = values;
    this.ID = ID;
  }

  init(codes, values) {
    let index = 0;
    for (const element of codes) {
      const key = document.createElement('button');
      key.className = 'key';
      key.innerHTML = element;
      if (element === 'Backspace' || element === 'Tab' || element === 'Enter' || element === 'CapsLock' || element === 'Delete' || element === 'Space') {
        key.classList.add('special');
      }
      if (!key.classList.contains('special')) {
        switch (index) {
          case 0: key.id = 'backquote'; break;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10: key.id = `digit${this.ID[index]}`; break;
          case 11: key.id = 'minus'; break;
          case 12: key.id = 'equal'; break;
          case 25: key.id = 'bracketleft'; break;
          case 26: key.id = 'bracketright'; break;
          case 38: key.id = 'semicolon'; break;
          case 39: key.id = 'quote'; break;
          case 40: key.id = 'backslash'; break;
          case 42: key.id = 'shiftleft'; break;
          case 50: key.id = 'comma'; break;
          case 51: key.id = 'period'; break;
          case 52: key.id = 'slash'; break;
          case 53: key.id = 'arrowup'; break;
          case 54: key.id = 'shiftright'; break;
          case 55: key.id = 'controlleft'; break;
          case 56: key.id = 'metaleft'; break;
          case 57: key.id = 'altleft'; break;
          case 59: key.id = 'altright'; break;
          case 60: key.id = 'arrowleft'; break;
          case 61: key.id = 'arrowdown'; break;
          case 62: key.id = 'arrowright'; break;
          case 63: key.id = 'controlright'; break;
          default: key.id = `key${this.ID[index]}`;
        }
      } else key.id = this.ID[index].toLowerCase();
      if (index === 14 || index === 28 || index === 42 || index === 55) {
        const lineFix = document.createElement('div');
        lineFix.className = 'clearfix';
        div.appendChild(lineFix);
      }
      key.setAttribute('data-value', values[index]);
      div.appendChild(key);
      index++;
    }
  }
}
function clean() {
  for (const item of pressed) {
    pressed.delete(item);
  }
}
// Initialization
const kbrd = new Kbrd(keyboardLabelsEn, keyboardValuesEn, keyboardLabelsEn);

function changeLang() {
  if ((pressed.has('ControlLeft') && pressed.has('AltLeft')) || (pressed.has('ControlRight') && pressed.has('AltRight'))) {
    clean();
    document.querySelector('.keyboard').innerHTML = '';
    keyboardLang = localStorage.getItem('lang');
    if (keyboardLang === 'en') {
      kbrd.init(keyboardLabelsRu, keyboardValuesRu, keyboardLabelsEn);
      localStorage.setItem('lang', 'ru');
    } else {
      kbrd.init(keyboardLabelsEn, keyboardValuesEn, keyboardLabelsEn);
      localStorage.setItem('lang', 'en');
    }
  }
}

function getCursorPosition(element) {
  let position = 0;
  element.focus();
  if (element.selectionStart || element.selectionStart === '0') {
    position = element.selectionStart;
  }
  return position;
}


if (localStorage.getItem('lang') !== 'ru') {
  kbrd.init(keyboardLabelsEn, keyboardValuesEn, keyboardLabelsEn);
} else {
  kbrd.init(keyboardLabelsRu, keyboardValuesRu, keyboardLabelsEn);
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 18 || event.keyCode === 17 || event.keyCode === 46) {
    event.preventDefault();
  }
  const keypr = document.getElementById(event.code.toLowerCase());
  if (keypr === null) return;
  if (event.code === 'ControlLeft' || event.code === 'ControlRight' || event.code === 'AltLeft' || event.code === 'AltRight') {
    keypr.classList.add('activeKey');
    setTimeout(() => keypr.classList.remove('activeKey'), 500);
    pressed.add(event.code);
    if (pressed.size > 2) { clean(); }
    setTimeout(() => changeLang(), 500);
    return;
  }
  if (event.code === 'CapsLock') {
    if (event.repeat) return;
    if (!keypr.classList.contains('active')) {
      keypr.classList.add('active');
      isCaps = true;
    } else {
      keypr.classList.remove('active');
      isCaps = false;
    }
    return;
  }
  
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (!keypr.classList.contains('active')) {
      keypr.classList.add('active');
      isShift = true;
    } else {
      keypr.classList.remove('active');
      isShift = false;
    }
    setTimeout(() => {
      if (event.repeat) {
        isShift = true;
        document.querySelector('.keyboard').innerHTML = '';
        if (localStorage.getItem('lang') === 'en') {
          kbrd.init(keyboardLabelsEnWithSymbols, keyboardValuesEnWithSymbols);
        } else {
          kbrd.init(keyboardLabelsRuWithSymbols, keyboardValuesRuWithSymbols);
        }
        return;
      }
      if (!event.repeat) {
        isShift = false;
        document.querySelector('.keyboard').innerHTML = '';
        if (localStorage.getItem('lang') === 'en') {
          kbrd.init(keyboardLabelsEn, keyboardValuesEn);
        } else {
          kbrd.init(keyboardLabelsRu, keyboardValuesRu);
        }
      }
    }, 500);
    return;
  }

  keypr.classList.add('activeKey');
  setTimeout(() => keypr.classList.remove('activeKey'), 500);
  if (keypr.getAttribute('data-value') === 'Backspace') {
    const cursorPos = getCursorPosition(textarea);
    textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos - 1], '') : textarea.value.split('').splice(0, textarea.value.length - 1).join('');
    return;
  }
  if (keypr.getAttribute('data-value') === 'Tab') {
    textarea.innerHTML += '\t';
    return;
  }
  if (keypr.getAttribute('data-value') === 'Del') {
    const cursorPos = getCursorPosition(textarea);
    textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos], '') : textarea.value.split('').splice(0, textarea.value.length).join('');
    return;
  }
  if ((isCaps && !isShift) || (!isCaps && isShift)) textarea.innerHTML += keypr.getAttribute('data-value').toUpperCase();
  else textarea.innerHTML += keypr.getAttribute('data-value');
});


document.addEventListener('mousedown', (event) => {
  if (event.target.getAttribute('data-value') === 'ControlLeft' || event.target.getAttribute('data-value') === 'ControlRight' || event.target.getAttribute('data-value') === 'AltLeft' || event.target.getAttribute('data-value') === 'AltRight') {
    pressed.add(event.target.getAttribute('data-value'));
    if (pressed.size > 2) { clean(); }
    changeLang();
    isCaps = false;
    return;
  }
  if (event.target.classList.contains('key')) {
    if (event.target.getAttribute('data-value') === 'CapsLock') {
      if (!event.target.classList.contains('active')) {
        event.target.classList.add('active');
        isCaps = true;
      } else {
        event.target.classList.remove('active');
        isCaps = false;
      }
      return;
    }

    if (event.target.getAttribute('data-value') === 'Shift') {
      {
        if (event.target.classList.contains('key')) {
          if (!event.target.classList.contains('active')) {
            event.target.classList.add('active');
            isShift = true;
          } else {
            event.target.classList.remove('active');
            isShift = false;
          }
          document.querySelector('.keyboard').innerHTML = '';
          if (localStorage.getItem('lang') === 'en') {
            kbrd.init(keyboardLabelsEnWithSymbols, keyboardValuesEnWithSymbols);
          } else {
            kbrd.init(keyboardLabelsRuWithSymbols, keyboardValuesRuWithSymbols);
          }

          setTimeout(() => {
            document.querySelector('.keyboard').innerHTML = '';
            if (localStorage.getItem('lang') === 'en') {
              kbrd.init(keyboardLabelsEn, keyboardValuesEn);
            } else {
              kbrd.init(keyboardLabelsRu, keyboardValuesRu);
            }
          }, 2000);
          return;
        }
      }
    }
    if (event.target.getAttribute('data-value') === 'Backspace' || event.target.getAttribute('data-value') === 'Del') {
      const cursorPos = getCursorPosition(textarea);
      if (event.target.getAttribute('data-value') === 'Backspace') textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos - 1], '') : textarea.value.split('').splice(0, textarea.value.length - 1).join('');
      else { textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos], '') : textarea.value.split('').splice(0, textarea.value.length).join(''); }
    } else if ((isCaps && !isShift) || (!isCaps && isShift)) {
      textarea.innerHTML += event.target.getAttribute('data-value').toUpperCase();
    } else { textarea.innerHTML += event.target.getAttribute('data-value'); }
    event.target.classList.add('activeKey');
    setTimeout(() => event.target.classList.remove('activeKey'), 500);
  }
});
