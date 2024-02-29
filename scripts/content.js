function validateFields() {
    const domain = document.getElementById("domain").value;
    const username = document.getElementById("username").value;
    const masterPassword = document.getElementById("masterPassword").value;

    const domainError = document.getElementById("domain-error");
    const usernameError = document.getElementById("username-error");
    const masterPasswordError = document.getElementById("masterPassword-error");

    domainError.innerText = "";
    usernameError.innerText = "";
    masterPasswordError.innerText = "";

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

    //TODO check for at least one uppercase/lowercase/number/special checkbox
    //TODO length should be > 1

    const userData = {
        "domain": domain,
        "username": username,
        "masterPassword": masterPassword,
        //TODO need to update
        "maxLength": 12,
        "isRequiredUpperCase": true,
        "isRequiredLowerCase": true,
        "isRequiredNumber": true,
        "isRequiredSpecial": true,
    }

    if (isValid) {
        generatePassword(userData);
    }
}