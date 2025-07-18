// كلمة السر
const passwordOverlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const submitPassword = document.getElementById("submitPassword");
const passwordError = document.getElementById("passwordError");

const validPasswords = [
  "chfeyfi",
  "chfyfi",
  "chfeyfy",
  "chefty",
  "chfeifi",
  "chfyfy"
];

document.body.style.overflow = 'hidden';

submitPassword.onclick = () => {
  const value = passwordInput.value.trim().toLowerCase();
  if (validPasswords.includes(value)) {
    passwordOverlay.style.display = "none";
    document.body.style.overflow = '';
  } else {
    passwordError.style.display = "block";
  }
};