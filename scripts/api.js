// API'a göndermemiz gereken kimlik bilgileri
const options = {
    headers: {
      'X-RapidAPI-Key':
        '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
      'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
    },
  };


export class API {
    // Kullanıcı isminden hesap bilgilerine erişme
    static async getUser(username){
      const res = await fetch(`https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`, options);
        // verileri işleme
        const data = await res.json();
        // verileri döndür
        return data;
    }

    // diğer API istekleri
    static async fetchData(endpoint){
        // parametre olarak gelen endpointe istek atma
        const res = await fetch(`https://twitter-api45.p.rapidapi.com${endpoint}`,options)
        // veriyi işle ve fonksiyonun çağrıldığı yere gönder
         return await res.json();
    }
}