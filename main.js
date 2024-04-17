const API_KEY = `f17c0665a4984e26955a5cdb01c37a40`
let newsList = []
const menus = document.querySelectorAll(".menus button")

menus.forEach((menu)=> menu.addEventListener("click", (event)=> getNewsByCategory(event)))

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

const getLatestNews = async() => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

    getNews(url)

}

const getNewsByCategory = async(event) =>{
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    
    getNews(url)
}
const getNewsByKeyword = async() => {
    const keyword = document.getElementById('search-input').value
    console.log("keyword", keyword)
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)

    getNews(url)
}

const getNews = async(url) =>{
    try {
    
        const response = await fetch(url)
        
        const data = await response.json()
        console.log('data', data)
        if(response.status===200){
            if(data.articles.length===0){
                throw new Error("No result for this research")
            }

            newsList = data.articles
            totalResults = data.totalResults

            render()
            paginationRender(totalResults)
        }else{
            throw new Error(data.message)
        }

    } catch(error){
        errorRender(error.message)
    }
    
}

const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`).join('');
    document.getElementById('news-board').innerHTML = newsHTML;

}

const errorRender = (errorMessage) => {
    const errorHTML =`<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`

    document.getElementById('news-board').innerHTML=errorHTML
}

let totalResults = 0
let page = 1 // current page number
const pageSize = 10 // showing how many articles in a page
let groupSize = 5 // number of pages in one group

const paginationRender = (totalResult) => {
    // page
    // pageSize
    const groupSize = Math.ceil(totalResult / 5) // how many groups there are

    let pageGroup = Math.ceil(page / groupSize) // which group does current page belong
    let lastPage = pageGroup * groupSize
    let firstPage = lastPage - (groupSize-1)
    let paginationHTML=``

    for (let i=firstPage; i<lastPage; i++){
        paginationHTML+=`<li class="page-item" onClick="moveToPage()"><a class="page-link" href="#">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML=paginationHTML
}
const moveToPage = () => {

}

getLatestNews();
