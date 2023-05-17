import { loginRequest, red } from "./request.js";
import { toast } from "./toast.js";

function authentication(){
    const token = localStorage.getItem("authToken");
    const isAdm = JSON.parse(localStorage.getItem("isAdm"));

    if(token){
        if(isAdm){
            location.replace("./admin.html");
        }else{
            location.replace("./user.html")
        }
    }
}

function handleButtonLoginPage(){
    const homeButton = document.querySelector("#login__home__button");
    const registerButton = document.querySelectorAll(".login__register__button");

    homeButton.addEventListener("click", ()=>{
        location.replace("../../index.html");
    })

    registerButton.forEach((button)=>{
        button.addEventListener("click", ()=>{
            location.replace("./register.html")
        })
    })
}

function handleLogin(){
    const inputs = document.querySelectorAll(".login-screen__input");
    const button = document.querySelector("#login-button");

    let loginBody = {};
    let count = 0;

    button.addEventListener("click", async (event)=>{
        event.preventDefault();

        inputs.forEach(input =>{
            if(input.value.trim()==""){
                count++;
            }

            loginBody[input.name] = input.value;
        })
        if(count !=0){
            count=0;
            toast(red, "Preencha os campos necessários");
        }else{
            const token = await loginRequest(loginBody);
            return token;
        }
    })
}

authentication();
handleLogin();
handleButtonLoginPage();