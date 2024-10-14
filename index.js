//const API_KEY="7d1632fada824725892e2cf2c0caf3d7";
//const API_KEY="QGOWVXsyGuMrCQmb87Icvd6wS9qUUeFZTSNuIb5MkXQ";
const API_KEY="31597965248f4ed58a717c7948c85fc8";
//const url="https://newsapi.org/v2/everything?q=";
//const url="https://api.newscatcherapi.com/v2/latest_headlines?";
const url="https://api.worldnewsapi.com/search-news?";

window.addEventListener("load", ()=>fetchNews("science", "en"));

async function fetchNews(topic, language){
    // const response=await fetch(`${url}topic=${topic}&lang=${language}`, {
    //     headers:{
    //         "x-api-key":API_KEY
    //     }
    // });
    const response=await fetch(`${url}text=${topic}&language=${language}&api-key=${API_KEY}`);
    const data=await response.json();
    bindArticles(data.news);
    //console.log(response);
}

function bindArticles(articles){
    const cardCont = document.getElementById('card-container');
    const cardTemplate=document.getElementById('temp-news-card');
    cardCont.innerHTML="";
    let count=0;
    !!articles && articles.forEach((article) => {
        if(!article.image) return;
        // if(!article.title) return;
        if(count>20) return;
        const cloneOfCard=cardTemplate.content.cloneNode(true);
        appendData(cloneOfCard, article);
        cardCont.appendChild(cloneOfCard);
        count++;
    });
}
function appendData(cloneOfCard, article){
    const newsImg=cloneOfCard.querySelector('#news-img');
    const newsTitle=cloneOfCard.querySelector('#news-title');
    const newsSrc=cloneOfCard.querySelector('#news-source');
    const newsDesc=cloneOfCard.querySelector('#news-desc');

    newsImg.src=article.image;
    newsTitle.innerHTML=article.title;
    summary=article.text;
    let desc="";
    countSentence=0;
    for (let index=0; index < summary.length; index++) {
        if(countSentence>3){
            break;
        }
        let char = summary[index];
        if(char=='.'){
            countSentence++;
        }
        desc+=char;
    }
    newsDesc.innerHTML=desc;

    //const date=new Date(article.publishedAt).toLocaleString("en-US", {timeZone:"Asia/Jakarta",});
    //newsSrc.innerHTML=`${article.source.name}  •  ${date}`;
    //newsSrc.innerHTML=`${article.rights} • ${article.published_date}`;
    newsSrc.innerHTML=article.publish_date;
    cloneOfCard.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}
let selectedNav=null;
function onNavItem(query, language="en"){
    fetchNews(query, language);
    const navItem=document.getElementById(query);
    selectedNav?.classList.remove('selected');
    selectedNav=navItem;
    selectedNav.classList.add('selected');
}

const searchButton=document.getElementById('search-button');
const input=document.getElementById('search-text');

searchButton.addEventListener("click", ()=>{
    const query=input.value;
    if(!query) return;
    fetchNews(query);
    selectedNav?.classList.remove('selected');
    selectedNav=null;
})

function socialMedia(id){
    if(id==="github"){
        window.open("https://github.com/ShrutiKishore15", "_blank");
    }
    else{
        window.open("https://www.linkedin.com/in/shruti-kishore-ba474222a", "_blank");
    }
}