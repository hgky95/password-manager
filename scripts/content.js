const DEFAULT_PASSWORD_LENGTH = 8;
const DEFAULT_PASSWORD_VERSION = 1;
const PW_VERSION_ID = "pwVersion";
const REQUIRED_UPPERCASE_ID = "isRequiredUppercase";
const REQUIRED_LOWER_ID = "isRequiredLowercase";
const REQUIRED_NUMBER_ID = "isRequiredNumber";
const REQUIRED_SPECIAL_ID = "isRequiredSpecial";
const GENERATED_BTN_ID = "generateBtn";
const MAX_LENGTH_INCREMENT_BTN_ID = "maxLengthIncrementBtn";
const MAX_LENGTH_DECREMENT_BTN_ID = "maxLengthDecrementBtn";
const MAX_LENGTH_ID = "maxLength";
const PW_VERSION_INCREMENT_BTN_ID = "pwVersionIncrementBtn";
const PW_VERSION_DECREMENT_BTN_ID = "pwVersionDecrementBtn";
const COPY_CLIPBOARD_BTN_ID = "copyClipboard";
const GENERATED_PASSWORD_ID = "generatedPassword";
const TOGGLE_PASSWORD_ID = "togglePassword";
const MASTER_PASSWORD_ID = "masterPassword";
const TOGGLE_GENERATED_PASSWORD_ID = "toggleGeneratedPassword";

let maxLengthCounter = DEFAULT_PASSWORD_LENGTH;
let pwVersionCounter = DEFAULT_PASSWORD_VERSION;

let isRequiredUppercase = document.getElementById(REQUIRED_UPPERCASE_ID).checked;
let isRequiredLowercase = document.getElementById(REQUIRED_LOWER_ID).checked;
let isRequiredNumber = document.getElementById(REQUIRED_NUMBER_ID).checked;
let isRequiredSpecial = document.getElementById(REQUIRED_SPECIAL_ID).checked;

document.getElementById(GENERATED_BTN_ID).addEventListener("click", generatePassword);
document.getElementById(MAX_LENGTH_INCREMENT_BTN_ID).addEventListener("click", increaseMaxLength);
document.getElementById(MAX_LENGTH_DECREMENT_BTN_ID).addEventListener("click", decreaseMaxLength);
document.getElementById(MAX_LENGTH_ID).addEventListener("input", setMaxLength);
document.getElementById(PW_VERSION_INCREMENT_BTN_ID).addEventListener("click", increasePWVersion);
document.getElementById(PW_VERSION_DECREMENT_BTN_ID).addEventListener("click", decreasePWVersion);
document.getElementById(PW_VERSION_ID).addEventListener("input", setPWVersion);
document.getElementById(COPY_CLIPBOARD_BTN_ID).addEventListener("click", copyToClipboard);
document.getElementById(REQUIRED_UPPERCASE_ID).addEventListener("change", function() {
    isRequiredUppercase = getCheckboxValues(REQUIRED_UPPERCASE_ID);
});
document.getElementById(REQUIRED_LOWER_ID).addEventListener("change", function() {
    isRequiredLowercase = getCheckboxValues(REQUIRED_LOWER_ID);
});
document.getElementById(REQUIRED_NUMBER_ID).addEventListener("change", function() {
    isRequiredNumber = getCheckboxValues(REQUIRED_NUMBER_ID);
});
document.getElementById(REQUIRED_SPECIAL_ID).addEventListener("change", function() {
    isRequiredSpecial = getCheckboxValues(REQUIRED_SPECIAL_ID);
});

document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
document.getElementById(PW_VERSION_ID).value = pwVersionCounter;
const togglePassword = document.getElementById(TOGGLE_PASSWORD_ID);
const password = document.getElementById(MASTER_PASSWORD_ID);
const generatedPassword = document.getElementById(GENERATED_PASSWORD_ID);
const toggleGeneratedPassword = document.getElementById(TOGGLE_GENERATED_PASSWORD_ID);

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});

toggleGeneratedPassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = generatedPassword.getAttribute("type") === "password" ? "text" : "password";
    generatedPassword.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});

function getCheckboxValues(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    return checkbox.checked;
}

function setMaxLength() {
    maxLengthCounter = parseInt(document.getElementById(MAX_LENGTH_ID).value);
}
function increaseMaxLength() {
    if (maxLengthCounter >= 32) {
        maxLengthCounter = 32;
        document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
        return;
    }
    if (maxLengthCounter < 4) {
        maxLengthCounter = 4;
        document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
        return;
    }
    maxLengthCounter = maxLengthCounter + 1;
    document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
}

function decreaseMaxLength() {
    if (maxLengthCounter <= 4) {
        maxLengthCounter = 4;
        document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
        return;
    }
    if (maxLengthCounter > 32) {
        maxLengthCounter = 32;
        document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
        return;
    }
    maxLengthCounter = maxLengthCounter - 1;
    document.getElementById(MAX_LENGTH_ID).value = maxLengthCounter;
}

function setPWVersion() {
    pwVersionCounter = parseInt(document.getElementById(PW_VERSION_ID).value);
}
function increasePWVersion() {
    pwVersionCounter = pwVersionCounter + 1;
    document.getElementById(PW_VERSION_ID).value = pwVersionCounter;
}

function decreasePWVersion() {
    if (pwVersionCounter <= 1) {
        pwVersionCounter = 1;
        document.getElementById(PW_VERSION_ID).value = pwVersionCounter;
        return;
    }
    pwVersionCounter = pwVersionCounter - 1;
    document.getElementById(PW_VERSION_ID).value = pwVersionCounter;
}

function copyToClipboard() {
    const textToCopy = document.getElementById(GENERATED_PASSWORD_ID).value;
    navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Copying to clipboard successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

async function generatePassword() {
    const domain = document.getElementById("domain").value;
    const username = document.getElementById("username").value;
    const masterPassword = document.getElementById(MASTER_PASSWORD_ID).value;
    const maxLength = document.getElementById(MAX_LENGTH_ID).value;
    const pwVersion = document.getElementById(PW_VERSION_ID).value;

    const domainError = document.getElementById("domain-error");
    const usernameError = document.getElementById("username-error");
    const masterPasswordError = document.getElementById("masterPassword-error");
    const maxLengthError = document.getElementById("maxLength-error");
    const pwVersionError = document.getElementById("pwVersion-error");

    domainError.innerText = "";
    usernameError.innerText = "";
    masterPasswordError.innerText = "";
    maxLengthError.innerText = "";
    pwVersionError.innerText = "";

    let isValid = true;

    if (!domain.trim()) {
        domainError.innerText = "Domain is required";
        isValid = false;
    }

    if (!username.trim()) {
        usernameError.innerText = "Username is required";
        isValid = false;
    }

    if (!masterPassword.trim()) {
        masterPasswordError.innerText = "Master Password is required";
        isValid = false;
    }

    if (maxLength < 4 || maxLength > 32) {
        maxLengthError.innerText = "Password length should be from 4 to 32";
        isValid = false;
    }

    if (pwVersion < 1) {
        pwVersionError.innerText = "Password version should be greater than 0";
        isValid = false;
    }

    //TODO check for at least one uppercase/lowercase/number/special checkbox
    //TODO length should be > 1

    const userData = {
        "domain": domain,
        "username": username,
        "masterPassword": masterPassword,
        "maxLength": maxLengthCounter,
        "pwVersion": pwVersionCounter,
        "isRequiredUpperCase": isRequiredUppercase,
        "isRequiredLowerCase": isRequiredLowercase,
        "isRequiredNumber": isRequiredNumber,
        "isRequiredSpecial": isRequiredSpecial,
    }

    if (isValid) {
        document.getElementById(GENERATED_PASSWORD_ID).value = await hashPassword(userData);
    }
}