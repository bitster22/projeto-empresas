import { getAllCompanies } from "./request.js";
import { getAllCategories } from "./request.js";
import { getCompanyByCategory } from "./request.js";
import { categoryCompanyList } from "./render.js";
import { renderCompanyHome } from "./render.js";
import { renderSelectCategory } from "./render.js";

async function showCompaniesInfos(){
    await getAllCompanies();
    const companiesInfo = JSON.parse(localStorage.getItem("companies"));
    const companiesList = document.querySelector(".home-companies__list");

    companiesList.innerHTML = "";

    companiesInfo.forEach((companyInfo)=>{
        renderCompanyHome(companyInfo);
    })
}

async function showSelectCategories(){
    await getAllCategories();

    const categories = JSON.parse(localStorage.getItem("categories"));
    const select = document.querySelector("#select-category");
    const option = document.createElement("option");
    option.innerHTML = "Selecionar Categoria";
    option.value = "all";

    select.innerHTML = "";
    
    select.appendChild(option);

    categories.forEach((categorie)=>{
        renderSelectCategory(categorie);
    })

    select.addEventListener("change", async ()=>{
        if(select.value=="all"){
            showCompaniesInfos();
        }else{
            const filteredCompanies = await getCompanyByCategory(categoryCompanyList(select.value));
            const companiesList = document.querySelector(".home-companies__list");
                companiesList.innerHTML = "";

            filteredCompanies.forEach((company)=>{
                renderCompanyHome(company);
            })
        }
    })
}

function handleButtonHome(){
    const loginButton = document.querySelector("#home__login__button");
    const registerButton = document.querySelector("#home__register__button");

    loginButton.addEventListener("click", ()=>{
        location.replace("./src/pages/login.html");
    })
    registerButton.addEventListener("click", ()=>{
        location.replace("./src/pages/register.html");
    })
}

showSelectCategories();
showCompaniesInfos();
handleButtonHome();
