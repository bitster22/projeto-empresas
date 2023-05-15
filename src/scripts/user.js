import { getEmployeeInfo } from "./request.js";
import { getDepartamentInfo } from "./request.js";
import { renderUserInfo } from "./render.js";
import { renderUserCompany } from "./render.js";
import { renderUserCompanyList } from "./render.js";
import { renderUserCompanyNotHired } from "./render.js";

function authentication(){
    const token = localStorage.getItem("authToken");
    const isAdm = JSON.parse(localStorage.getItem("isAdm"));

    if(!token){
        location.replace("../../index.html");
    }else{
        if(isAdm){
            location.replace("./admin.html")
        }
    }
}

async function showUserInfos(){
    await getEmployeeInfo();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    renderUserInfo(userInfo);
    console.log(userInfo)
}

async function showUserCompanyList(){
    
    await getEmployeeInfo();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const departamentId = userInfo.department_id;

    if(departamentId!=null){
        const departamentInfo = await getDepartamentInfo(departamentId);
        const employees = departamentInfo.employees;
        renderUserCompany(departamentInfo);
        employees.forEach((employee)=>{
            renderUserCompanyList(employee.name);
        })
    }else{
        renderUserCompanyNotHired();
    }
}

function handleLogOut(){
    const logOutButton = document.querySelector("#logout__login");

    logOutButton.addEventListener("click", ()=>{
        localStorage.clear();
        location.replace("../../index.html");
    })
}
authentication();
showUserInfos();
showUserCompanyList();
handleLogOut();