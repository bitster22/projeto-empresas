import { getAllCompanies } from "./request.js";
import { getAllCategories } from "./request.js";
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
}

showSelectCategories();
showCompaniesInfos();
