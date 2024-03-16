const API_KEY = `f17c0665a4984e26955a5cdb01c37a40`

const getLatestNews = () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    console.log("uuu", url);
}