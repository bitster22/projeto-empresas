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
        }else{
            console.log("Erro");
        }
    })
}