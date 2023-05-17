import { createDepartamentRequest, deleteDepartamentRequest, deleteUserRequest, dismissEmployeeRequest, getAllCompanies, getDepartamentInfo, getEmployeesOutOfWork, hireUserRequest, red, updateDepartamentRequest, updateUserRequest } from "./request.js";
import { renderModalSelectCompany, renderModalViewDinamicComponents, renderModalViewStaticComponents } from "./render-admin.js";
import { adminListDepartaments, adminListEmployee } from "./admin.js";
import { toast } from "./toast.js";

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

    let editBody = {};

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
        adminListDepartaments();
        deleteDepartamentModal.close();
    })

}

export async function handleViewDepartament(){
    const viewDepartamentModal = document.querySelector("#departament-view");
    const select = document.querySelector("#modal-view-select");
    const departament = await getDepartamentInfo(viewDepartamentModal.dataset.departamentId);
    const notEmployed = await getEmployeesOutOfWork();

    let hireBody = {};

    renderModalViewStaticComponents(departament, notEmployed);
    const hireButton = document.querySelector(".modal__button__hire");

    hireButton.addEventListener("click", async ()=>{
        
        hireBody["department_id"] = viewDepartamentModal.dataset.departamentId;
        const hiring = await hireUserRequest(hireBody, select.value);
        adminListEmployee();
        viewDepartamentModal.close();
    })
    const list = document.querySelector(".list-users-modal");
    list.innerHTML = "";

    departament.employees.forEach((employee)=>{
        renderModalViewDinamicComponents(employee, departament.company.name);
    })
    
    const dismissEmployeeButton = document.querySelectorAll(".list-users-modal__element__button");
    dismissEmployeeButton.forEach((button)=>{
        button.addEventListener("click", async ()=>{
            const dismissing = await dismissEmployeeRequest(button.dataset.employeeId);
            adminListEmployee();
            viewDepartamentModal.close();
        })
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
            toast(red, "Preencha os campos necessários");
        }else{
            const createDepartament = await createDepartamentRequest(CreateBody);
        }
        adminListDepartaments();
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
            toast(red, "Preencha os campos necessários");
        }else{
            const editUser = await updateUserRequest(editBody, editUserModal.dataset.employeeId);
            adminListEmployee();
            editUserModal.close();
        }
    })
}

export async function handleDeleteUser(){
    const deleteUserModal = document.querySelector("#user-delete");
    const deleteUserName = document.querySelector("#user-delete-name");
    const deleteUserButton = document.querySelector("#modal-remove-user-button");

    deleteUserName.innerHTML = ` ${deleteUserModal.dataset.employeeName}`;

    deleteUserButton.addEventListener("click", async ()=>{
        const deleteUser = await deleteUserRequest(deleteUserModal.dataset.employeeId);
        adminListEmployee();
        deleteUserModal.close();

    })
}

handleModals();
createDepartamentSelectCompany();
handleCreateDepartament();