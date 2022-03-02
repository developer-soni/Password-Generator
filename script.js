const passwordElm = document.getElementById("password");
const copyElm = document.getElementById("copy");
const lengthElm = document.getElementById("length");
const uppercaseElm = document.getElementById("uppercase");
const lowercaseElm = document.getElementById("lowercase");
const numbersElm = document.getElementById("numbers");
const symbolsElm = document.getElementById("symbols");
const generateElm = document.getElementById("generate");


// pre-defining values for our password
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=";

//get the respective value
const randomElm = {
    lower: getLower,
    upper: getUpper,
    number: getNumber,
    symbol: getSymbol
}

// generate button
generateElm.addEventListener("click", ()=>{
    const length = +lengthElm.value;
    const hasUpper = uppercaseElm.checked;
    const hasLower = lowercaseElm.checked;
    const hasNumber = numbersElm.checked;
    const hasSymbol = symbolsElm.checked;

    passwordElm.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
});

// functions to get options Random values 
function getUpper(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getLower(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getNumber(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbol(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Copy password to clipboard
copyElm.addEventListener("click", () => {
    const textarea = document.createElement('textarea');
    const pass = passwordElm.innerText;

    if(!pass){
        return;
    }
    textarea.value = pass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password Copied To ClipBoard !");
});

// generate passowrd logic
function generatePassword(length, upper, lower, number, symbol){
    // Init pw var
    // Filter out unchecked items
    // Loop over length and call generator fn for each type
    // Add final pw to pw var and return

    let password = '';
    const typesCount = upper + lower + number + symbol;

    const typesArray = [{upper}, {lower}, {number}, {symbol}].filter
    ( 
        item => Object.values(item)[0]
    );

    if(typesCount === 0){
        return 'Select Options First !';
    }

    for(let i=0; i<length; i +=typesCount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

            password += randomElm[funcName]();
        });
    }

    return password;
}