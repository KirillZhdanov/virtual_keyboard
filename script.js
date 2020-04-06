const textarea = document.createElement('textarea');
textarea.id = 'textarea';
document.body.append(textarea);
const div = document.createElement('div');
div.className = 'keyboard';
document.body.append(div);
let keyboardLang = 'ru';
let isCaps = false;
// const isShift = false;
const keyboardLabelsEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardLabelsRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl'];
const keyboardValuesEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  '\t', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', '\n',
  'LeftShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'RightShift',
  'ControlLeft', '', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
const keyboardValuesRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  '\t', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', '\n',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
  'ControlLeft', 'Win', 'AltLeft', ' ', 'AltRight', '&#9668;', '&#9660;', '&#9658;', 'ControlRight'];
init(keyboardLabelsRu, keyboardValuesRu);
const pressed = new Set();
document.addEventListener('keydown', (event) => {
  console.log(`${event.keyCode} ${event.key} ${String.fromCharCode(event.keyCode)}`);
  pressed.add(event.code);
  console.log(pressed);
  if (pressed.size > 2) { clean(); }
  changeLang(pressed, keyboardLang);
  // textarea.value+=String.fromCharCode(event.keyCode);
});

function clean() {
  for (const item of pressed) { pressed.delete(item); }
}
function changeLang() {
  if ((pressed.has('ControlLeft') && pressed.has('AltLeft')) || (pressed.has('ControlRight') && pressed.has('AltRight'))) {
    console.log(pressed);
    clean(pressed);
    document.querySelector('.keyboard').innerHTML = '';
    if (keyboardLang === 'en') {
      init(keyboardLabelsRu, keyboardValuesRu);
      keyboardLang = 'ru';
    } else {
      init(keyboardLabelsEn, keyboardValuesEn);
      keyboardLang = 'en';
    }
  }
}
// /Init
function init(codes, values) {
  let index = 0;
  for (const element of codes) {
    const key = document.createElement('button');
    key.className = 'key';
    key.innerHTML = element;
    if (element === 'Backspace' || element === 'Tab' || element === 'Enter' || element === 'Shift' || element === 'CapsLock' || element === 'Del' || element === 'Space') {
      key.classList.add('special');
    }
    // else
    key.id = `key${element}`;
    if (index === 14 || index === 28 || index === 42 || index === 55) {
      const lineFix = document.createElement('div');
      lineFix.className = 'clearfix';
      div.appendChild(lineFix);
    }
    key.setAttribute('data-value', values[index]);


    // key.innerHTML=String.fromCharCode(element).toLocaleLowerCase();
    div.appendChild(key);
    index++;
  }
}
document.addEventListener('mousedown', (event) => {
  pressed.add(event.target.getAttribute('data-value'));
  if (pressed.size > 2) { clean(); }
  changeLang(pressed, keyboardLang);
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

    if (event.target.getAttribute('data-value') === 'Backspace' || event.target.getAttribute('data-value') === 'Del') {
      const cursorPos = getCursorPosition(textarea);
      console.log(cursorPos);
      if (event.target.getAttribute('data-value') === 'Backspace') textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos - 1], '') : textarea.value.split('').splice(0, textarea.value.length - 1).join('');
      else { textarea.innerHTML = cursorPos > 0 ? textarea.value.replace(textarea.value[cursorPos], '') : textarea.value.split('').splice(0, textarea.value.length).join(''); }
    } else if (isCaps === true) {
      textarea.innerHTML += event.target.getAttribute('data-value').toUpperCase();
    } else { textarea.innerHTML += event.target.getAttribute('data-value'); }
    event.target.classList.add('activeKey');
    setTimeout(() => event.target.classList.remove('activeKey'), 500);
  }
});
function getCursorPosition(el) {
  let CaretPos = 0;
  if (document.selection) {
    el.focus();
    const selectionRange = document.selection.createRange();
    selectionRange.moveStart('character', -el.value.length);
    CaretPos = selectionRange.text.length;
  } else if (el.selectionStart || el.selectionStart === '0') {
    CaretPos = el.selectionStart;
  }
  return CaretPos;
}
