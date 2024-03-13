const HASH_ALGORITHM = 'SHA-256';
const UPPERCASE_KEY = 'uppercase';
const LOWERCASE_KEY = 'lowercase';
const NUMBER_KEY = 'number';
const SPECIAL_KEY = 'special';
const DOMAIN_KEY = 'domain';
const USERNAME_KEY = 'username';
const MASTER_PASSWORD_KEY = 'masterPassword';
const MAX_LENGTH_KEY = 'maxLength';
const PW_VERSION_KEY = 'pwVersion';

const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()';

const CHARACTER_SETS = {
    [UPPERCASE_KEY]: upperChars,
    [LOWERCASE_KEY]: lowerChars,
    [NUMBER_KEY]: numberChars,
    [SPECIAL_KEY]: specialChars,
};

function getRequireRules(isRequiredUpperCase, isRequiredLowerCase, isRequiredNumber, isRequiredSpecial) {
    let rules = [];

    if (isRequiredUpperCase) {
        rules.push(UPPERCASE_KEY);
    }
    if (isRequiredLowerCase) {
        rules.push(LOWERCASE_KEY);
    }
    if (isRequiredNumber) {
        rules.push(NUMBER_KEY);
    }
    if (isRequiredSpecial) {
        rules.push(SPECIAL_KEY);
    }
    return rules;
}

function getRequireChars(requiredRules) {
    let allRequiredChars = '';

    for (const rule of requiredRules) {
        allRequiredChars += CHARACTER_SETS[rule];
    }
    return allRequiredChars;
}

function getRemainCharsBasedOnRule(byte, rule) {
    let charsOfRule = CHARACTER_SETS[rule];
    return charsOfRule[byte % charsOfRule.length]
}


async function hashPassword(userData) {

    const domain = userData[DOMAIN_KEY];
    const username = userData[USERNAME_KEY];
    const masterPassword = userData[MASTER_PASSWORD_KEY];
    const maxLength = userData[MAX_LENGTH_KEY];
    const pwVersion = userData[PW_VERSION_KEY];
    const isRequiredUpperCase = userData['isRequiredUpperCase'];
    const isRequiredLowerCase = userData['isRequiredLowerCase'];
    const isRequiredNumber = userData['isRequiredNumber'];
    const isRequiredSpecial = userData['isRequiredSpecial'];
    const requiredRules = getRequireRules(isRequiredUpperCase, isRequiredLowerCase, isRequiredNumber, isRequiredSpecial);

    const combinedString = domain + username + masterPassword + pwVersion;
    const encoder = new TextEncoder();
    const passwordHash = await crypto.subtle.digest(HASH_ALGORITHM, encoder.encode(combinedString));
    const passwordHashArray = Array.from(new Uint8Array(passwordHash));

    const allRequiredChars = getRequireChars(requiredRules);

    const baseLength = maxLength - requiredRules.length;
    let password = "";
    for (let i = 0; i < baseLength; i++) {
        let byte = passwordHashArray[i];
        password += allRequiredChars[byte % allRequiredChars.length]
    }

    let remainChars = '';
    for (let i = baseLength; i < maxLength; i++) {
        let byte = passwordHashArray[i];
        let rule = requiredRules[(maxLength - 1) - i];
        remainChars += getRemainCharsBasedOnRule(byte, rule);
    }

    password += remainChars;
    return password;
}