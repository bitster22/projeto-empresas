import { registerRequest } from "./request.js";

function handleNavigation(){
    const homeButton = document.querySelector("#home-button");
    const loginButton = document.querySelectorAll(".login-button");

    homeButton.addEventListener("click", ()=>{
        location.replace("../../index.html");
    })
    loginButton.forEach((button)=>{
        button.addEventListener("click", ()=>{
            location.replace("./login.html");
        })
    })
}

function handleRegister(){
    const inputs = document.querySelectorAll(".register-screen__input");
    const registerButton = document.querySelector(".register-screen__button-sign-in");

    let registerBody = {};
    let count = 0;

    registerButton.addEventListener("click", async (event)=>{
        event.preventDefault();

        inputs.forEach(input =>{
            if(input.value.trim()==""){
                count++;
            }

            registerBody[input.name] = input.value;
        })

        console.log(registerBody);

        if(count!=0){
            count=0;
            console.log("Preencha os campos necessários");
        }else{
            const register = await registerRequest(registerBody);
            console.log(register);
        }
    })
}

handleNavigation();
handleRegister();