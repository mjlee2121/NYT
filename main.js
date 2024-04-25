
const API_KEY =`f17c0665a4984e26955a5cdb01c37a40`

let newsList = []

const menus = document.querySelectorAll(".menus button")

menus.forEach((menu)=>{menu.addEventListener("click", (event)=> getNewsByCategory(event))})

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

const getLatestNews = async() => {
        url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    
        getNews(url)
    
}

const getNewsByCategory = async(event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)

    getNews(url)
    
}

const getNewsByKeyword = async() => {
    try{
        const keyword = document.getElementById('search-input').value
        url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    
        getNews(url)
    }
    catch (error){
        errorRender('Can\'t find news related to this keyword')
    }
}

// 1,2,3,4,5 is first group, 6,7,8,9,10 is second group

let totalResults = 0
let page = 1 // current page number
const pageSize = 10 // showing how many articles in a page
let groupSize = 5 // number of pages in one group


const getNews = async(page) => { // asynchronous execution codes gets executed even one line of code is not done being executed

    try {
        url.searchParams.set('page', page)
        url.searchParams.set('pageSize', pageSize)

        const response = await fetch(url)
        const data = await response.json()

        if(response.status===200){
            if(data.articles.length===0){
                throw new Error("No result for this search")
            }

            newsList = data.articles
            totalArticles = data.totalResults

            render()
            paginationRender(totalArticles)
        }else{
            throw new Error(data.message)
        }

    }
    catch (error){
        errorRender(error)
    } 
}

const render = () => {
        const newsHTML = newsList.map(
            (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src=${news.urlToImage} />
        </div>
        <div class="col-lg-8">
            <h2 class="article-title" onclick="oneArticleRender('${encodeURIComponent(JSON.stringify(news))}')">${news.title}</h2> // special characters
            <p>${news.description}</p>
            <div>
                ${news.source.name} * ${news.publishedAt}
            </div>
        </div>
    </div>`).join(''); // this is to remove ','
        document.getElementById('news-board').innerHTML = newsHTML;
    
}

const errorRender = (errorMessage) => {
    const errorHTML =`<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`

    document.getElementById('news-board').innerHTML=errorHTML
}

const oneArticleRender = async(news) => {
    // const currentNews = JSON.parse(decodeURIComponent(news)) // special character
    const currentNews = JSON.parse((news))
    const renderCurrentNews=
    `
    <container>
        <section>
            <div><h1>${currentNews.title}</h1></div>
            <p>${currentNews.description}</p>
            <div>
                ${currentNews.source.name} * ${currentNews.publishedAt}
            </div>
            <div>
                <img class="current-news-img-size" src=${currentNews.urlToImage} />
            </div>
            <div>
                <h4>${currentNews.content}</h4>
                <p>${currentNews.url}</p>
            </div>
        </section>
    </container>
    `
    document.getElementById('news-board').innerHTML = renderCurrentNews;
    
}

const escapeJSONString = (jsonString) => {
    return jsonString.replace(/'/g, "\\'");
}

const paginationRender = (totalResult) => {
    const groupSize = 5
    const totalPages = Math.ceil(totalResult/pageSize) // 37 / 10 => 4. Accurate
    let pageGroup = Math.ceil(page / 5) // which group does current page belong . Accurate
    let lastPage = pageGroup * groupSize 

    if (lastPage > totalPages){
        lastPage = totalPages
    }

    let firstPage = lastPage - (groupSize-1) <= 0 ? 1: lastPage - (groupSize-1)
    let paginationHTML = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`

    for (let i = firstPage; i<lastPage+1; i++){
        paginationHTML +=
        `<li class="page-item ${
            i===page ? "active":""
        }" onClick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
    }
    paginationHTML += `<li class="page-item onClick="moveToPage()"><a class="page-link" href="#">Next</a></li>`
    document.querySelector(".pagination").innerHTML=paginationHTML
}

const moveToPage = (pageNumber) => {
    page = pageNumber
    getNews(page)
}



getLatestNews()

//////////////////////
// const API_KEY = `f17c0665a4984e26955a5cdb01c37a40`
// let newsList = []
// const menus = document.querySelectorAll(".menus button")

// menus.forEach((menu)=> menu.addEventListener("click", (event)=> getNewsByCategory(event)))

// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

// const getLatestNews = async() => {
//     url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

//     getNews(url)

// }

// const getNewsByCategory = async(event) =>{
//     const category = event.target.textContent.toLowerCase()
//     url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    
//     getNews(url)
// }
// const getNewsByKeyword = async() => {
//     const keyword = document.getElementById('search-input').value
//     url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)

//     getNews(url)
// }

// let totalResults = 0
// let page = 1 // current page number
// const pageSize = 10 // showing how many articles in a page
// let groupSize = 5 // number of pages in one group

// const getNews = async() =>{
//     try {
//         url.searchParams.set('page',page)
//         url.searchParams.set('pageSize', pageSize)

//         const response = await fetch(url)
//         const data = await response.json()

//         if(response.status===200){
//             if(data.articles.length===0){
//                 throw new Error("No result for this research")
//             }

//             newsList = data.articles
//             totalResults = data.totalResults

//             render()
//             paginationRender(totalResults)
//         }else{
//             throw new Error(data.message)
//         }

//     } catch(error){
//         errorRender(error.message)
//     }
    
// }

// const render = () => {
//     const newsHTML = newsList.map(
//         (news) => `<div class="row news">
//     <div class="col-lg-4">
//         <img class="news-img-size" src=${news.urlToImage} />
//     </div>
//     <div class="col-lg-8">
//         <h2>${news.title}</h2>
//         <p>${news.description}</p>
//         <div>
//             ${news.source.name} * ${news.publishedAt}
//         </div>
//     </div>
// </div>`).join('');
//     document.getElementById('news-board').innerHTML = newsHTML;

// }

// const errorRender = (errorMessage) => {
//     const errorHTML =`<div class="alert alert-danger" role="alert">
//   ${errorMessage}
// </div>`

//     document.getElementById('news-board').innerHTML=errorHTML
// }

// const paginationRender = (totalResult) => {
//     const groupSize = Math.ceil(totalResult / 5) // how many groups there are
//     const totalPages = Math.ceil(totalResult/pageSize)
//     let pageGroup = Math.ceil(page / groupSize) // which group does current page belong
//     let lastPage = pageGroup * groupSize
//     if (lastPage > totalPages){
//         lastPage = totalPages
//     }
//     let firstPage = lastPage - (groupSize-1) <=0 ? 1: lastPage - (groupSize-1)
//     let paginationHTML = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`

//     for (let i = firstPage; i<lastPage; i++){
//         paginationHTML +=
//         `<li class="page-item ${
//             i===page ? "active":""
//         }" onClick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
//     }
//     paginationHTML += `<li class="page-item onClick="moveToPage()"><a class="page-link" href="#">Next</a></li>`
//     document.querySelector(".pagination").innerHTML=paginationHTML
// }

// const moveToPage = (pageNumber) => {
//     page = pageNumber
//     getNews(page)
// }

// getLatestNews();
