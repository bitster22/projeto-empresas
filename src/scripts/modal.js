import { createDepartamentRequest, getAllCompanies } from "./request.js";
import { renderModalSelectCompany } from "./render.js";
import { adminListDepartaments } from "./admin.js";

function handleModals(){
    const createDepartamentButton = document.querySelector(".create-departament");
    const createDepartamentModal = document.querySelector("#departament-create");
    const createDepartamentCloseModal = document.querySelector("#close__create-departament");

    createDepartamentButton.addEventListener("click", ()=>{
        createDepartamentModal.showModal();
        createDepartamentCloseModal.addEventListener("click", ()=>{
            createDepartamentModal.close();
        })
    })
}

async function createDepartamentSelectCompany(){
    await getAllCompanies();
    const selectCompany = document.querySelector(".modal-company-select");
    const option = document.createElement("option");
    const companiesInfo = JSON.parse(localStorage.getItem("companies"));
    option.innerHTML = "Selecionar Empresa";
    option.value = "all";
    selectCompany.innerHTML = "";
    selectCompany.appendChild(option);

    companiesInfo.forEach((company)=>{
        renderModalSelectCompany(company);
    })
}

async function handleCreateDepartament(){
    const inputs = document.querySelectorAll(".departament-create__input");
    const createButton = document.querySelector(".modal__buton__create");

    let CreateBody = {};
    let count = 0;

    createButton.addEventListener("click", async (event)=>{
        event.preventDefault();

        inputs.forEach((input)=>{
            if(input.value.trim==""){
                count++;
            }
            CreateBody[input.name] = input.value;
        })
        if(count!=0){
            count = 0;
            console.log("Preencha os campos -- toast");
        }else{
            const createDepartament = await createDepartamentRequest(CreateBody);
            console.log(createDepartament);
        }
        adminListDepartaments();
        console.log(CreateBody);
    })

    
}

handleModals();
createDepartamentSelectCompany();
handleCreateDepartament();