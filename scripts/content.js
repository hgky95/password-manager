const DEFAULT_PASSWORD_LENGTH = 8;
let maxLengthCounter = DEFAULT_PASSWORD_LENGTH;
let isRequiredUppercase = document.getElementById("isRequiredUppercase").checked;
let isRequiredLowercase = document.getElementById("isRequiredLowercase").checked;
let isRequiredNumber = document.getElementById("isRequiredNumber").checked;
let isRequiredSpecial = document.getElementById("isRequiredSpecial").checked;

document.getElementById("generateBtn").addEventListener("click", generatePassword);
document.getElementById("maxLengthIncrementBtn").addEventListener("click", increaseMaxLength);
document.getElementById("maxLengthDecrementBtn").addEventListener("click", decreaseMaxLength);
document.getElementById("maxLength").addEventListener("input", setMaxLength);
document.getElementById("copyClipboard").addEventListener("click", copyToClipboard);
document.getElementById("isRequiredUppercase").addEventListener("change", function() {
    isRequiredUppercase = getCheckboxValues("isRequiredUppercase");
});
document.getElementById("isRequiredLowercase").addEventListener("change", function() {
    isRequiredLowercase = getCheckboxValues("isRequiredLowercase");
});
document.getElementById("isRequiredNumber").addEventListener("change", function() {
    isRequiredNumber = getCheckboxValues("isRequiredNumber");
});
document.getElementById("isRequiredSpecial").addEventListener("change", function() {
    isRequiredSpecial = getCheckboxValues("isRequiredSpecial");
});

document.getElementById("maxLength").value = maxLengthCounter;
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("masterPassword");
const generatedPassword = document.getElementById("generatedPassword");
const toggleGeneratedPassword = document.getElementById("toggleGeneratedPassword");

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
    maxLengthCounter = parseInt(document.getElementById("maxLength").value);
}
function increaseMaxLength() {
    if (maxLengthCounter >= 32) {
        maxLengthCounter = 32;
        document.getElementById("maxLength").value = maxLengthCounter;
        return;
    }
    if (maxLengthCounter < 4) {
        maxLengthCounter = 4;
        document.getElementById("maxLength").value = maxLengthCounter;
        return;
    }
    maxLengthCounter = maxLengthCounter + 1;
    document.getElementById("maxLength").value = maxLengthCounter;
}

function decreaseMaxLength() {
    if (maxLengthCounter <= 4) {
        maxLengthCounter = 4;
        document.getElementById("maxLength").value = maxLengthCounter;
        return;
    }
    if (maxLengthCounter > 32) {
        maxLengthCounter = 32;
        document.getElementById("maxLength").value = maxLengthCounter;
        return;
    }
    maxLengthCounter = maxLengthCounter - 1;
    document.getElementById("maxLength").value = maxLengthCounter;
}

function copyToClipboard() {
    const textToCopy = document.getElementById("generatedPassword").value;
    navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Copying to clipboard successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

async function generatePassword() {
    const domain = document.getElementById("domain").value;
    const username = document.getElementById("username").value;
    const masterPassword = document.getElementById("masterPassword").value;
    const maxLength = document.getElementById("maxLength").value;

    const domainError = document.getElementById("domain-error");
    const usernameError = document.getElementById("username-error");
    const masterPasswordError = document.getElementById("masterPassword-error");
    const maxLengthError = document.getElementById("maxLength-error");

    domainError.innerText = "";
    usernameError.innerText = "";
    masterPasswordError.innerText = "";
    maxLengthError.innerText = "";

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

    //TODO check for at least one uppercase/lowercase/number/special checkbox
    //TODO length should be > 1

    const userData = {
        "domain": domain,
        "username": username,
        "masterPassword": masterPassword,
        //TODO need to update
        "maxLength": maxLengthCounter,
        "isRequiredUpperCase": isRequiredUppercase,
        "isRequiredLowerCase": isRequiredLowercase,
        "isRequiredNumber": isRequiredNumber,
        "isRequiredSpecial": isRequiredSpecial,
    }

    if (isValid) {
        document.getElementById("generatedPassword").value = await hashPassword(userData);
    }
}