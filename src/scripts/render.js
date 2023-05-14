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