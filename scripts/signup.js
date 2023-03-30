const password_input = document.querySelector("#password_input");
const password_eye = document.querySelector("#password_eye");
let loweruppercase = document.querySelector(".loweruppercase i");
let loweruppercasetext = document.querySelector(".loweruppercase span");

let numbercase = document.querySelector(".numbercase i");
let numbercasetext = document.querySelector(".numbercase span");
let specialcase = document.querySelector(".specialcase i");
let specialcasetext = document.querySelector(".specialcase span");

let numcharacter = document.querySelector(".numcharacter i");
let numcharactertext = document.querySelector(".numcharacter span");


password_eye.addEventListener('click',()=>{
if(password_input.type=="password"){
password_input.type="text";
password_eye.classList.add("fa-eye"); 
password_eye.classList.remove("fa-eye-slash");


}else if(password_input.type=="text"){
password_input.type="password";
password_eye.classList.add("fa-eye-slash");
password_eye.classList.remove("fa-eye");
}

});

password_input.addEventListener('keyup',function(){

let pass = document.getElementById("password_input").value;
passStrength(pass);
});

function passStrength(pass){

if(pass.length>7){

    numcharacter.classList.remove("fa-circle");
    numcharacter.classList.add("fa-check");
    numcharacter.classList.add("green-color");
    numcharactertext.classList.add("green-color");
    }else{

    numcharacter.classList.remove("fa-check");
    numcharacter.classList.add("fa-circle");
    numcharacter.classList.remove("green-color");
    numcharactertext.classList.remove("green-color");
    }

if(pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){

loweruppercase.classList.remove("fa-circle");
loweruppercase.classList.add("fa-check");
loweruppercase.classList.add("green-color");
loweruppercasetext.classList.add("green-color");
}else{

loweruppercase.classList.remove("fa-check");
loweruppercase.classList.add("fa-circle");
loweruppercase.classList.remove("green-color");
loweruppercasetext.classList.remove("green-color");
}


if(pass.match(".*\\d.*")){

numbercase.classList.remove("fa-circle");
numbercase.classList.add("fa-check");
numbercase.classList.add("green-color");
numbercasetext.classList.add("green-color");
}else{

numbercase.classList.remove("fa-check");
numbercase.classList.add("fa-circle");
numbercase.classList.remove("green-color");
numbercasetext.classList.remove("green-color");
}


if(pass.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){

    specialcase.classList.remove("fa-circle");
    specialcase.classList.add("fa-check");
    specialcase.classList.add("green-color");
    specialcasetext.classList.add("green-color");
    }else{

    specialcase.classList.remove("fa-check");
    specialcase.classList.add("fa-circle");
    specialcase.classList.remove("green-color");
    specialcasetext.classList.remove("green-color");
    }


    }
    
var password = document.getElementById('password_input');
let random_password = document.querySelector('#random_password');
var passwordLength = 14;
var passwordVal = "";

window.onload = function loadPassword() {

    let randomGenerateChars = "B&vp3hSMQQsu#sR2+mTJx6kf6kHhHk^nNceWW_$=tEG#";

    for (var i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * randomGenerateChars.length);
        passwordVal += randomGenerateChars.substring(randomNumber, randomNumber + 1);
    }
    random_password.innerHTML = "Password suggestion - " + passwordVal;
}; 
password.addEventListener('focus', function() {
    if (password.value === '') {
        random_password.style.display = 'block';
    }
});
random_password.addEventListener('click', function() {
    
    password_input.value = passwordVal;
    random_password.style.display = 'none';
});