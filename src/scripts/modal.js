import { createDepartamentRequest, deleteDepartamentRequest, getAllCompanies, getDepartamentInfo, updateDepartamentRequest, updateUserRequest } from "./request.js";
import { renderModalSelectCompany } from "./render.js";
import { adminListDepartaments, adminListEmployee } from "./admin.js";

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

export async function handleEditDepartament(){
    const editDepartamentModal = document.querySelector("#departament-edit");
    const departamentDescription = document.querySelector("#description-departament-edit");
    const departamentEditButton = document.querySelector("#modal-edit-button");
    departamentDescription.innerHTML =  (await getDepartamentInfo(editDepartamentModal.dataset.departamentId)).description;

    let editBody = {}

    departamentEditButton.addEventListener("click", async ()=>{
        editBody[departamentDescription.name] = departamentDescription.value;
        const departamentEdit = await updateDepartamentRequest(editBody, editDepartamentModal.dataset.departamentId);
        adminListDepartaments();
        editDepartamentModal.close();
    })
}

export async function handleDeleteDepartament(){
    const deleteDepartamentModal = document.querySelector("#departament-delete");
    const deleteDepartamentName = document.querySelector(".delete-departament-name");
    const deleteDepartamentButton = document.querySelector("#modal-delete-button");

    deleteDepartamentName.innerHTML = `Departamento ${(await getDepartamentInfo(deleteDepartamentModal.dataset.departamentId)).name}`
    deleteDepartamentButton.addEventListener("click", async ()=>{
        const deleteDepartament = await deleteDepartamentRequest(deleteDepartamentModal.dataset.departamentId);
        console.log(deleteDepartament)
        adminListDepartaments();
        deleteDepartamentModal.close();
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
        }
        adminListDepartaments();
        console.log(CreateBody);
    })
}

export async function handleEditUser(){
    const editUserModal = document.querySelector("#user-edit");
    const inputs = document.querySelectorAll(".edit-user-input");
    const editButton = document.querySelector("#modal-edit-user-button");

    let editBody = {};
    let count = 0;

    editButton.addEventListener("click", async (event)=>{
        event.preventDefault();

        inputs.forEach((input)=>{
            if(input.value.trim==""){
                count++;
            }
            editBody[input.name] = input.value;
        })
        if(count!=0){
            count=0;
            console.log("Preencha os campos -- toast");
        }else{
            const editUser = await updateUserRequest(editBody, editUserModal.dataset.employeeId);
            adminListEmployee();
            editUserModal.close();
            console.log(editUser)
        }
    })
}

handleModals();
createDepartamentSelectCompany();
handleCreateDepartament();