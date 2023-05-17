import { toast } from "./toast.js";

const token = JSON.parse(localStorage.getItem("authToken")) || ""
const baseUrl = "http://localhost:3333";
const requestHeaders = {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
}

export const red = '#df1545';
export const green = '#168821';

export async function getAllCompanies(){
    await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET",
    }).then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            localStorage.setItem("companies", JSON.stringify(response));
        }else{
            toast(red, "Erro. Empresas não carregadas");
        }
    })
}

export async function getAllCategories(){
    await fetch(`${baseUrl}/categories/readAll`, {
        method: "GET",
    }).then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            localStorage.setItem("categories", JSON.stringify(response));
        }else{
            toast(red, "Erro. Categorias não carregadas");
        }
    })
}

export async function getCompanyByCategory(categoryName){
    const filter = await fetch(`${baseUrl}/companies/readByCategory/${categoryName}`, {
        method: "GET",
    }).then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return filter;
}

export async function loginRequest(loginBody){
    const tokenRequest = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then(async (res)=>{
        if(res.ok){
            const responseJson = await res.json();
            const {authToken, isAdm} = responseJson;

            localStorage.setItem("authToken", JSON.stringify(authToken));
            localStorage.setItem("isAdm", JSON.stringify(isAdm));

            if(!isAdm){
                toast(green, "Login realizado com sucesso.");
                setTimeout(()=>{
                    location.replace("./user.html");
                }, 2000)
            }else{
                toast(green, "Login admin realizado com sucesso.");
                setTimeout(()=>{
                    location.replace("./admin.html");
                }, 2000)
            }
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
}

export async function getEmployeeInfo(){
    const userInfo = await fetch(`${baseUrl}/employees/profile`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            localStorage.setItem("userInfo", JSON.stringify(response));
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
}

export async function getDepartamentInfo(departament_id){
    const departamentInfo = await fetch(`${baseUrl}/departments/readById/${departament_id}`,{
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return departamentInfo;
}

export async function registerRequest(registerBody){
    const register = await fetch(`${baseUrl}/employees/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, "Cadastro realizado com sucesso!");
            setTimeout(() => {
                location.replace("./login.html");
            }, 2000);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return register;
}

export async function getAllDepartaments(){
    const allDepartaments = await fetch(`${baseUrl}/departments/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return allDepartaments;
}

export async function getAllUsers(){
    const allUsers = await fetch(`${baseUrl}/employees/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return allUsers;
}

export async function getCompanyInfo(company_id){
    const companyInfo = await fetch(`${baseUrl}/companies/readById/${company_id}`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return companyInfo;
}

export async function createDepartamentRequest(departamentBody){
    const departament = await fetch(`${baseUrl}/departments/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(departamentBody)
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, `Departamento ${response.name} criado com sucesso`);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return departament;
}

export async function updateDepartamentRequest(departamentBody, department_id){
    const departament = await fetch(`${baseUrl}/departments/update/${department_id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(departamentBody)
    })
    .then(async(res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, response.message);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return departament;
}

export async function deleteDepartamentRequest(department_id){
    const departament = await fetch(`${baseUrl}/departments/delete/${department_id}`,{
        method: "DELETE",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, response.message);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return departament;
}

export async function updateUserRequest(userBody, employee_id){
    const user = await fetch(`${baseUrl}/employees/updateEmployee/${employee_id}`,{
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    })
    .then(async(res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, "Usuário atualizado com sucesso");
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return user;
}

export async function deleteUserRequest(employee_id){
    const user = await fetch(`${baseUrl}/employees/deleteEmployee/${employee_id}`, {
        method: "DELETE",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, response.message);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return user;
}

export async function getEmployeesOutOfWork(){
    const users = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return users;
}

export async function hireUserRequest(userBody, employee_id){
    const user = await fetch(`${baseUrl}/employees/hireEmployee/${employee_id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, response.message);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return user;
}

export async function dismissEmployeeRequest(employee_id){
    const user = await fetch(`${baseUrl}/employees/dismissEmployee/${employee_id}`,{
        method: "PATCH",
        headers: requestHeaders
    })
    .then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            toast(green, response.message);
            return response;
        }else{
            const response = await res.json();
            toast(red, response.message);
        }
    })
    return user;
}