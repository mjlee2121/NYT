const API_KEY = `f17c0665a4984e26955a5cdb01c37a40`
let newsList = []
const menus = document.querySelectorAll(".menus button")

menus.forEach((menu)=> menu.addEventListener("click", (event)=> getNewsByCategory(event)))


const getLatestNews = async() => {
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles

    render()

}

const getNewsByCategory = async(event) =>{
    const category = event.target.textContent.toLowerCase()
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles

    render()
}
const getNewsByKeyword = async() => {
    const keyword = document.getElementById('search-input').value
    console.log("keyword", keyword)
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)

    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles

    render()
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

getLatestNews();
