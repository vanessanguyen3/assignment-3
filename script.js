// Assignment code here
// lightweight jquery-esq function
/**
 *
 * @param {String|Function|HTMLElement} selector
 * @returns
 */
function $(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }
  if (typeof selector === 'function') {
    return document.addEventListener('DOMContentLoaded', selector);
  }
  return selector;
}

const letters = 'abcdefghijklmnopqrstuvwxyz';
const specials = '!@#$%^&*()_+-={}|[]\\;:\'",./<>?';
const numbers = '1234567890';

const charactersToOption = {
  lowercase: letters,
  uppercase: letters.toUpperCase(),
  numbers,
  specials,
};

function generatePassword() {
  const eligibleCharacters = Object.keys(charactersToOption).reduce(
    (acc, key) => {
      if ($(`#${key}`).checked) {
        return `${acc}${charactersToOption[key]}`;
      }
      return acc;
    },
    ''
  );
  if (eligibleCharacters.length === 0) {
    return alert('You must select an option to generate the password with');
  }
  const length = parseInt($('#length').value);
  if (length === NaN || length < 8 || length > 128) {
    return alert(
      'An invalid length was provided. It must be between 8 and 128.'
    );
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    result += eligibleCharacters.charAt(
      Math.floor(Math.random() * eligibleCharacters.length)
    );
  }
  return result;
}

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  if (password) {
    $('#password').value = password;
  }
}

// Add event listener to generate button
$('#generate').addEventListener('click', writePassword);
