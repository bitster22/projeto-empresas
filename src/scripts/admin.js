import { getAllDepartaments, getCompanyInfo, getDepartamentInfo } from "./request.js";
import { getAllCompanies } from "./request.js";
import { renderDepartamentList, renderSelectCompany, renderEmployeeList } from "./render.js";
import { getAllUsers } from "./request.js";

async function adminListDepartaments(){
    const allDepartaments = await getAllDepartaments();
    const listDepartaments = document.querySelector(".list-department");
    listDepartaments.innerHTML = ""
    
    allDepartaments.forEach(async (departament)=>{
        const companyName = (await getDepartamentInfo(departament.id)).company.name;
        renderDepartamentList(departament, companyName);
    })
}

async function adminSelectCompanies(){
    await getAllCompanies();
    const companiesInfo = JSON.parse(localStorage.getItem("companies"));
    const adminSelect = document.querySelector(".select-sector__admin");
    const option = document.createElement("option");

    adminSelect.innerHTML = "";

    option.innerHTML = "Selecionar Empresa";
    option.value = "all";

    adminSelect.appendChild(option);

    companiesInfo.forEach((company)=>{
        renderSelectCompany(company);
    })
}

async function adminListEmployee(){
    const listEmployees = document.querySelector(".list-users");
    listEmployees.innerHTML = "";
    const allEmployees = await getAllUsers();
    allEmployees.forEach(async (employee)=>{
        let companyName;
        if(employee.company_id!=null){
            companyName = (await getCompanyInfo(employee.company_id)).name;
        }else{
            companyName = "Não empregado";
        }
        renderEmployeeList(employee, companyName);
    })

}

adminListDepartaments();
adminListEmployee();
adminSelectCompanies();