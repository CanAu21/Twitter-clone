import { getLocal } from "./scripts/helpers.js"
import { renderLoader, renderUserInfo, ele, renderTimeline, renderResults, renderDetail, renderDetailLoading, renderUserPage } from "./scripts/ui.js"
import { API } from "./scripts/api.js";


 // lokal'den kullanıcı bilgilerini al 
 const user = getLocal("USER");


 // url'deki path değerine göre ekrana basılacak içeriği belirleme
 const router = async() => {
    // kullanıcının konumuna ulaşma
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const query = params.get("q");

    // page'in değerine göre ekrana basılacak arayüzü belirleme
    switch(page){
        // tweet detay
        case "status":
            // tweet detayına giderken loadin ekranı basma
            renderDetailLoading(ele.main);
            // tweet detayları için API isteği
            const tweetData = await API.fetchData(`/tweet.php?id=${query}`);
            // detayları ekrana bas
            renderDetail(tweetData);
            break;
        // arama sayfası
        case "search":
            renderLoader(ele.main);
            const results = await API.fetchData(`/search.php?query=${query}`)
            renderResults(results, ele.main);
            break;
        // kullanıcı detay sayfası
        case "user":
            // kullanıcının hesap bilgilerini basma
            renderLoader(ele.main);
            const userInfo = await API.getUser(query);
            renderUserPage(userInfo);
            const outlet = document.querySelector('.page-bottom');
            renderLoader(outlet);
            const userTweet = await API.fetchData(`/timeline.php?screenname=${query}`);
            renderTimeline(userTweet,outlet);
            break;
        // ana sayfayı ekrana basma
        default:
            // yüklenme ekranı basma
            renderLoader(ele.tweetsArea);
            // kullanıcı tweetlerini alma
            const data = await API.fetchData(`/timeline.php?screenname=${user.profile}`);
            // tweetleri ekrana basma
            renderTimeline(data, ele.tweetsArea);
            break;
            
    }
 };

// Sayfanın yüklenme anını izleme
document.addEventListener("DOMContentLoaded",()=>{ 
    if(user){
        // kullanıcı bilgileri lokal'de varsa bilgileri ekrana bas
        renderUserInfo(user);
    } else {
        // kullanıcı bilgileri lokal'de yok ise login sayfasına yönlendir
        location = "/auth.html";
    }
    // hangi sayfanın ekrana basılacağına karar verme 
    router();
});

// çıkış butonuna tıklama
ele.logoutBtn.addEventListener("click",() =>{
    // lokal'den kullanıcıyı kaldırma
    localStorage.removeItem("USER");
    // sayfayı yönlendirme
    location = "/auth.html";

});

// Arama kısmı
ele.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    // aratılan terimi urlye ekletme
    location = `?page=search&q=${query}`
});

// Tweet detaylarındaki geri butonuna tıklandığında
ele.main.addEventListener("click", (e) => {
    if(e.target.id === "back-btn"){
        // sayfa olarak bir adım geriye gitme
        history.back();
    }
})




