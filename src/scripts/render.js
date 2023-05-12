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