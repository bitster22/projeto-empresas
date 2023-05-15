const token = JSON.parse(localStorage.getItem("authToken")) || ""
const baseUrl = "http://localhost:3333";
const requestHeaders = {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
}

export async function getAllCompanies(){
    await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET",
    }).then(async (res)=>{
        if(res.ok){
            const response = await res.json();
            localStorage.setItem("companies", JSON.stringify(response));
        }else{
            console.log("Erro - remover depois");
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
            console.log("Erro - remover depois");
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
            console.log("Erro - remover depois");
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

            console.log(authToken, isAdm);

            if(!isAdm){
                console.log("Toast");
                location.replace("./user.html")
            }else{
                console.log("Toast");
                location.replace("./admin.html")
            }
        }else{
            console.log("Erro");
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
            console.log("Erro - colocar o toast");
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
            console.log("Erro - colocar o toast");
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
            location.replace("./login.html")
            return response;
        }else{
            console.log("Erro");
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
            console.log("Erro - colocar o toast");
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
            console.log("Erro - colocar o toast");
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
            console.log("Erro, colocar o toast");
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
            return response;
        }else{
            console.log("Erro");
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
            return response;
        }else{
            console.log("Erro");
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
            return response;
        }else{
            console.log(response.message);
        }
    })
    return departament;
}