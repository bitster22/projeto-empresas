import { handleEditDepartament, handleDeleteDepartament, handleEditUser, handleDeleteUser, handleViewDepartament } from "./modal.js";

export function renderCompanyHome(company){
    const ul = document.querySelector(".home-companies__list");

    const li = document.createElement("li");
    const companyName = document.createElement("h3");
    const category = document.createElement("span");

    li.classList.add("home-companies__list__element", "flex", "flex__dir-column");
    companyName.classList.add("home-companies__list__element__company-name");
    category.classList.add("home-companies__list__element__category", "color-brand1", "flex", "flex__justify-center");

    companyName.innerHTML = company.name;
    category.innerHTML = categoryCompanyList(company.category_id);

    li.append(companyName, category);
    ul.appendChild(li);
}

export function renderSelectCategory(category){
    const select = document.querySelector("#select-category");

    const option = document.createElement("option");

    option.value = category.id;
    option.innerHTML = category.name;

    select.appendChild(option);
}

export function categoryCompanyList(id){
    const categories = JSON.parse(localStorage.getItem("categories"));

    let categoryName;
    categories.forEach((category)=>{
        if(category.id == id){
            categoryName = category.name;
        }
    })
    return categoryName;
}

export function renderUserInfo(user){
    const userInfo = document.querySelector(".user-info");
    userInfo.innerHTML = "";

    const userName = document.createElement("h1");
    const userEmail = document.createElement("p");

    userName.classList.add("user-info__username");
    userEmail.classList.add("user-info__email");

    userName.innerHTML = user.name;
    userEmail.innerHTML = user.email;

    userInfo.append(userName, userEmail);
}

export function renderUserCompany(departamentInfo){
    const companies = document.querySelector(".companies");
    companies.innerHTML="";

    const companiesTitle = document.createElement("h2");
    const list = document.createElement("ul");

    companiesTitle.classList.add("companies__company-infos", "flex", "flex__justify-center");
    list.classList.add("list-employees", "flex", "flex__space-between", "flex__wrap");

    companiesTitle.innerText = `${departamentInfo.company.name} - ${departamentInfo.name}`

    companies.append(companiesTitle, list);
}

export function renderUserCompanyList(name){
    const list = document.querySelector(".list-employees");

    const listElement = document.createElement("li");
    const employeeName = document.createElement("span");

    listElement.classList.add("list-employees__element");
    employeeName.classList.add("list-employers__element__employee-name");

    listElement.appendChild(employeeName);

    employeeName.innerHTML = name;

    list.appendChild(listElement);
}

export function renderUserCompanyNotHired(){
    const companies = document.querySelector(".companies");

    const NotHiredMessage = document.createElement("span");

    companies.innerHTML="";

    companies.classList.add("flex", "flex__align-center", "flex__justify-center");
    NotHiredMessage.classList.add("companies__not-hired");

    NotHiredMessage.innerText = "Você ainda não foi contratado";

    companies.appendChild(NotHiredMessage);
}

export function renderSelectCompany(company){
    const select = document.querySelector(".select-sector__admin");
    const option = document.createElement("option");

    option.innerHTML = company.name;
    option.value = company.id;

    select.appendChild(option);
}

export function renderDepartamentList(departament, companyName){
    const list = document.querySelector(".list-department");

    const listElement = document.createElement("li");

    const divInfoContainer = document.createElement("div");

    const h3DepartamentName = document.createElement("h3");
    const pDescription = document.createElement("p");
    const spanCompanyName = document.createElement("span");

    const divIconsContainer = document.createElement("div");

    const eyeIcon = document.createElement("i");
    const pencilIcon = document.createElement("i");
    const trashIcon = document.createElement("i");

    list.classList.remove("flex__align-center", "flex__justify-center");

    listElement.classList.add("list-department__element", "flex", "flex__space-between");

    divInfoContainer.classList.add("list-department__element__info", "flex", "flex__dir-column");

    h3DepartamentName.classList.add("list-department__element__info__departament-name");
    pDescription.classList.add("list-department__element__info__departament-description");
    spanCompanyName.classList.add("list-department__element__info__company-name");

    h3DepartamentName.innerHTML = departament.name;
    pDescription.innerHTML = departament.description;
    spanCompanyName.innerHTML = companyName;

    divIconsContainer.classList.add("list-department__element__icons", "flex", "flex__dir-column", "flex__justify-center");
    eyeIcon.classList.add("material-symbols-outlined", "color-brand1");
    pencilIcon.classList.add("material-symbols-outlined", "color-yellow");
    trashIcon.classList.add("material-symbols-outlined", "color-red");

    eyeIcon.innerHTML = "visibility";
    eyeIcon.dataset.departamentId = departament.id;
    eyeIcon.addEventListener("click", ()=>{
        const viewDepartamentModal = document.querySelector("#departament-view");
        const closeViewModal = document.querySelector("#close__departament-view");
        viewDepartamentModal.showModal();
        viewDepartamentModal.dataset.departamentId = departament.id;
        handleViewDepartament();
        closeViewModal.addEventListener("click", ()=>{
            viewDepartamentModal.close();
        })
    })
    pencilIcon.innerHTML = "edit";
    pencilIcon.dataset.departamentId = departament.id;
    pencilIcon.addEventListener("click", ()=>{
        const editDepartamentModal = document.querySelector("#departament-edit");
        const closeEditModal = document.querySelector("#close__edit-departament");
        editDepartamentModal.showModal();
        editDepartamentModal.dataset.departamentId = departament.id;
        handleEditDepartament();
        closeEditModal.addEventListener("click", ()=>{
            editDepartamentModal.close();
        })
    })
    trashIcon.innerHTML = "delete";
    trashIcon.dataset.departamentId = departament.id;
    trashIcon.addEventListener("click", ()=>{
        const deleteDepartamentModal = document.querySelector("#departament-delete");
        const closeDeleteModal = document.querySelector("#close__delete-departament");

        deleteDepartamentModal.showModal();
        deleteDepartamentModal.dataset.departamentId = departament.id;
        handleDeleteDepartament();
        closeDeleteModal.addEventListener("click", ()=>{
            deleteDepartamentModal.close();
        })
    })

    divInfoContainer.append(h3DepartamentName, pDescription, spanCompanyName);
    divIconsContainer.append(eyeIcon, pencilIcon, trashIcon);
    listElement.append(divInfoContainer, divIconsContainer);
    list.appendChild(listElement);
}

export function renderEmployeeList(employee, companyName){
    const list = document.querySelector(".list-users");
    const listElement = document.createElement("li");

    const divInfoContainer = document.createElement("div");
    const h3UserName = document.createElement("h3");
    const spanCompanyName = document.createElement("span");

    const divIconsContainer = document.createElement("div");
    const pencilIcon = document.createElement("i");
    const trashIcon = document.createElement("i");

    listElement.classList.add("list-users__element", "flex", "flex__space-between");

    divInfoContainer.classList.add("list-users__element__info", "flex", "flex__dir-column");
    h3UserName.classList.add("list-users__element__info__username");
    spanCompanyName.classList.add("list-users__element__info__company-name");

    h3UserName.innerHTML = employee.name;
    spanCompanyName.innerHTML = companyName;

    divIconsContainer.classList.add("list-users__element__icons", "flex", "flex__dir-column", "flex__justify-center");
    
    pencilIcon.classList.add("material-symbols-outlined", "color-yellow");
    trashIcon.classList.add("material-symbols-outlined", "color-red");

    pencilIcon.innerHTML = "edit";
    pencilIcon.dataset.employeeId = employee.id;
    pencilIcon.addEventListener("click", ()=>{
        const userEditModal = document.querySelector("#user-edit");
        const closeUserEditModal = document.querySelector("#close__edit-user");

        userEditModal.showModal();
        userEditModal.dataset.employeeId = employee.id;
        handleEditUser();
        closeUserEditModal.addEventListener("click", ()=>{
            userEditModal.close();
        })
    })
    trashIcon.innerHTML = "delete";
    trashIcon.dataset.employeeId = employee.id;
    trashIcon.addEventListener("click", ()=>{
        const deleteUserModal = document.querySelector("#user-delete");
        const closeUserEditModal = document.querySelector("#close__delete-user");
        deleteUserModal.showModal();
        deleteUserModal.dataset.employeeId = employee.id;
        deleteUserModal.dataset.employeeName = employee.name;
        handleDeleteUser();
        deleteUserModal.addEventListener("click", ()=>{
            deleteUserModal.close();
        })
    })

    divInfoContainer.append(h3UserName, spanCompanyName);
    divIconsContainer.append(pencilIcon, trashIcon);

    listElement.append(divInfoContainer, divIconsContainer);
    
    list.appendChild(listElement);
}

export function renderNoDepartaments(departamentPhrase){
    const departaments = document.querySelector(".list-department");

    const noDepartaments = document.createElement("span");

    departaments.innerHTML="";

    departaments.classList.add("flex", "flex__align-center", "flex__justify-center");
    noDepartaments.classList.add("list-departaments__no-departaments");

    noDepartaments.innerHTML = departamentPhrase;

    departaments.appendChild(noDepartaments);

}

export function renderModalSelectCompany(company){
    const select = document.querySelector(".modal-company-select");
    const option = document.createElement("option");

    option.innerHTML = company.name;
    option.value = company.id;

    select.appendChild(option);
}

export function renderModalViewStaticComponents(departament, uninployedList){
    const h2DepartamentName = document.querySelector(".modal__departament-name");
    const pDepartamentDescription = document.querySelector(".modal__departament-description");
    const spanCompanyName = document.querySelector(".modal__departament-company");
    const select = document.querySelector("#modal-view-select");
    select.innerHTML="";
    const optionSelect = document.createElement("option");
    optionSelect.innerHTML = "Selecionar usuário";
    optionSelect.value = "no-user"
    select.appendChild(optionSelect);
    const outOfWorkEmployees = uninployedList;

    outOfWorkEmployees.forEach((employee)=>{
        const option = document.createElement("option");
        option.innerHTML = employee.name;
        option.value = employee.id;
        select.appendChild(option);
    })

    h2DepartamentName.innerHTML = departament.name;
    pDepartamentDescription.innerHTML = departament.description;
    spanCompanyName.innerHTML = departament.company.name;
}

export function renderModalViewDinamicComponents(employee, companyName){
    const list = document.querySelector(".list-users-modal");
    const listElement = document.createElement("li");

    const divInfoContainer = document.createElement("div");
    const h3UserName = document.createElement("h3");
    const spanCompanyName = document.createElement("span");

    const button = document.createElement("button");

    listElement.classList.add("list-users-modal__element", "flex", "flex__dir-column", "flex__space-between", "flex__shrink");

    divInfoContainer.classList.add("list-users-modal__element__info", "flex", "flex__dir-column", "flex__align-center");
    h3UserName.classList.add("list-users-modal__element__info__username");
    spanCompanyName.classList.add("list-users-modal__element__info__company");

    button.classList.add("list-users-modal__element__button");

    h3UserName.innerHTML = employee.name;
    spanCompanyName.innerHTML = companyName;

    button.innerHTML = "Desligar";
    button.dataset.employeeId = employee.id;

    divInfoContainer.append(h3UserName, spanCompanyName);
    listElement.append(divInfoContainer, button);

    list.appendChild(listElement);
}