export const ele = {
    user_name : document.getElementById("user-name"),
    user_tag : document.getElementById("user-tag"),
    pics : document.querySelectorAll("#profile-pic"),
    tweetsArea : document.querySelector(".tweets-area"),
    logoutBtn : document.querySelector("#logout-btn"),
    form : document.querySelector("aside form"),
    main : document.querySelector("main")
};

// kullanıcı bilgilerini ekrana basma
export const renderUserInfo = (user) => {
    // kullanıcı resimlerini ekrana basma
    ele.pics.forEach((img) => (img.src = user.avatar));
    // kullanıcı ismini ekrana bas
    ele.user_name.innerText = user.name;
    ele.user_tag.innerText = "@" + user.profile;
};

  const getMedia = (media) => {
    let sorted = [];
    if (media && media.video) {
      // Diziye video öğeleri ekleyin
      sorted = media.video[0].variants.filter(
        (item) => item.content_type === 'video/mp4'
      );
      // Diziyi bitrate değerine göre sıralayın
      sorted = sorted.sort((a, b) => b.bitrate - a.bitrate);
    }
  
    if (media && media.photo) {
      return `<img src=${media.photo[0].media_url_https} />`;
    }
  
    if (sorted.length > 0) {
      return `
      <video controls>
       <source src="${sorted[0].url}" />
      </video>`;
    }
  
    return '';
  };

// yüklenme gifini ekrana basma
export const renderLoader = (outlet) => {
    outlet.innerHTML = 
    `
    <div class="d-flex justify-content-center my-5">
     <div class="spinner-grow" role="status">
      <span class="sr-only"></span>
     </div>
    </div>
    `
}

// ekrana tweetleri basacak fonk
export const renderTimeline = (data,outlet) => {
    outlet.innerHTML = data.timeline.map((i) =>
    `
    <div class="tweet">
    <a href="?page=user&q=${data.user.profile}">
    <img id="user-img" src="${data.user.avatar}" />
    </a>
    <div class="body">
      <div class="user">
        <div>
          <b>${data.user.name}</b>
          <p>@${data.user.profile}</p>
          <p>${moment(i.created_at).fromNow()}</p>
        </div>
        <i class="bi bi-three-dots"></i>
      </div>
      <a href="?page=status&q=${i.tweet_id}" class="content">
        <p>${i.text}</p>
        ${getMedia(i.media)}
      </a>
      <div class="buttons">
        <button>
          <i class="bi bi-chat"></i>
          <span>${i.replies}</span>
        </button>
        <button>
          <i class="bi bi-recycle"></i>
          <span>${i.retweets}</span>
        </button>
        <button>
          <i class="bi bi-heart"></i>
          <span>${i.favorites}</span>
        </button>
        <button>
          <i class="bi bi-bookmark"></i>
          <span>${i.bookmarks}</span>
        </button>
      </div>
    </div>
  </div>
    ` 
    )
    .join('');
};

export const renderResults = (data,outlet) => {
    outlet.innerHTML = data.timeline.map((i) =>
    `
    <div class="tweet">
    <a href="?page=user&q=${i.user_info.screen_name}">
    <img id="user-img" src="${i.user_info.avatar}" />
    </a>
    <div class="body">
      <div class="user">
        <div>
          <b>${i.user_info.name}</b>
          <p>@${i.user_info.screen_name}</p>
          <p>${moment(i.created_at).fromNow()}</p>
        </div>
        <i class="bi bi-three-dots"></i>
      </div>
      <a href="?page=status&q=${i.tweet_id}" class="content">
        <p>${i.text}</p>
        ${getMedia(i.media)}
      </a>
      <div class="buttons">
        <button>
          <i class="bi bi-chat"></i>
          <span>${i.replies}</span>
        </button>
        <button>
          <i class="bi bi-recycle"></i>
          <span>${i.retweets}</span>
        </button>
        <button>
          <i class="bi bi-heart"></i>
          <span>${i.favorites}</span>
        </button>
        <button>
          <i class="bi bi-bookmark"></i>
          <span>${i.bookmarks}</span>
        </button>
      </div>
    </div>
  </div>
    ` 
    )
    .join('');
};

// detay sayfası için loading
export const renderDetailLoading = () => {
  ele.main.innerHTML = 
  `
  <div class="nav">
    <i id="back-btn" class="bi bi-arrow-left"></i>
    <h4>Gönderi</h4>
  </div>

  <div class="d-flex justify-content-center my-5">
     <div class="spinner-grow" role="status">
      <span class="sr-only"></span>
     </div>
    </div>
  `
}

// Tweet Detaylarını ekrana basma
export const renderDetail = (data) => {
  ele.main.innerHTML = 
  `
  <div class="nav">
    <i id="back-btn" class="bi bi-arrow-left"></i>
    <h4>Gönderi</h4>
  </div>

  <div class="tweet detail-tweet">
    <a href="?page=user&q=${data.author.screen_name}">
    <img id="user-img" src="${data.author.image}" />
    </a>
    <div class="body">
      <div class="user">
        <div>
          <b>${data.author.name}</b>
          <p>@${data.author.screen_name}</p>
        </div>
        <i class="bi bi-three-dots"></i>
      </div>
      <div class="content">
        <p>${data.text}</p>
        ${getMedia(data.media)}
      </div>

      <div class="info">
      <p>${ new Date(data.created_at).toDateString()}</p>
        <button>
          <i class="bi bi-body-text"></i>
          <span>${data.views}</span>
        </button>
      </div>

      <div class="buttons">
        <button>
          <i class="bi bi-chat"></i>
          <span>${data.replies}</span>
        </button>
        <button>
          <i class="bi bi-recycle"></i>
          <span>${data.retweets}</span>
        </button>
        <button>
          <i class="bi bi-heart"></i>
          <span>${data.likes}</span>
        </button>
        <button>
          <i class="bi bi-bookmark"></i>
          <span>${data.bookmarks}</span>
        </button>
      </div>
    </div>
  </div>
  `
}

// hesap bilgilerini ekrana basma
export const renderUserPage = (data) => {
  ele.main.innerHTML =
  `
  <div class="user-page">
        <div class="page-top">
        <div class="top">
          <i id="back-btn" class="bi bi-arrow-left"></i>
          <div>
            <h3>${data.name}</h3>
            <span>${Math.round(Math.random()*9000)}</span>
          </div>
        </div>

        <div class="banner">
          <img src="https://picsum.photos/1080/360">
          <img class="user-pp" src="${data.avatar}">
        </div>

        <div class="buttons">

          <div class="icon">
            <i class="bi bi-three-dots"></i>
          </div>

          <div class="icon">
            <i class="bi bi-envelope"></i>
          </div>
          <button>Takip Et</button>
        </div>

        <div class="info">
          <h4>${data.name}</h4>
          <p class="profile">@${data.profile}</p>
          <p class="content">${data.desc}</p>

          <div>
            <a href="#">
              <span>${data.friends}</span>
              <span>Takip edilen</span>
            </a>
            <a href="#">
              <span>${data.sub_count}</span>
              <span>Takipçi</span>
            </a>
          </div>
        </div>

        <div class="wrapper">
          <div class="option">
            <input class="input" type="radio" name="btn" value="option1" checked="">
            <div class="btn">
              <span class="span">Gönderiler</span>
            </div>
          </div>
          <div class="option">
            <input class="input" type="radio" name="btn" value="option2">
            <div class="btn">
              <span class="span">Yanıtlar</span>
            </div>  </div>
          <div class="option">
            <input class="input" type="radio" name="btn" value="option3">
            <div class="btn">
              <span class="span">Medya</span>
            </div>  
          </div>
          <div class="option">
            <input class="input" type="radio" name="btn" value="option4">
            <div class="btn">
              <span class="span">Beğeni</span>
            </div>  
          </div>
        </div>
      </div>
      <div class="page-bottom"></div>
      </div>
  `
}
