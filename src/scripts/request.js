const baseUrl = "http://localhost:3333";

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