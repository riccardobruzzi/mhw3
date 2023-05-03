function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
 
  function onResponsespotify(response) {
   console.log('Risposta spotify ricevuta');
   return response.json();
 }
 
  function onJson_eventi(json) {
    console.log('JSON Img ricevuto');
    // Stampiamo il JSON per capire quali attributi ci servono
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.results
    var city = results[1].location['locality'];
     console.log(city);
    for(let result of results) {
       console.log(result['fsq_id']+' questo e un result');
       }
  
    if(results.length == 0)
    {
     const errore = document.createElement("h1"); 
     const messaggio = document.createTextNode("Nessun risultato!"); 
     errore.appendChild(messaggio); 
     library.appendChild(errore);
    }
  
    // Processa ciascun risultato
    for(let result of results)
    {
      // Leggiamo info
     const nome = result.name;
     const adress = result.location['formatted_address'];
     const album = document.createElement('div');
      album.classList.add('album');
      const name = document.createElement('div');
      const indirizzo = document.createElement('div');
      name.textContent = nome;
      indirizzo.textContent = adress;
     
      // Aggiungiamo immagine e didascalia al div
      album.appendChild(name);
      album.appendChild(indirizzo);
 
 
     
      // Aggiungiamo il div alla libreria
      library.appendChild(album);
      //chiamo la fetch di spotify, la chiamo all'interno della funzione onJson eventi perchè la variabile city si riferisce alla localita presa
      //dalla prima fetch, e non ho trovato una maniera differente di implementarla per la ricerca simultanea su enteambe le fetch sulla base
      //della città
      fetch('https://api.spotify.com/v1/search?q='+city+'&type=playlist&market=IT&limit=10',{
      headers:{
      'Authorization': 'Bearer ' + token,
      'Content-Type' : 'application/json'
 
      }}).then(onResponsespotify).then(spotify)
    }}
 
 function spotify(json){
   console.log('Json spotify ricevuto');
   console.log(json)
   const library = document.querySelector('#albumspotify');
   library.innerHTML = '';
   const results = json.playlists.items
   let num_results = results.lenght;
   
    if(results.length == 0)
    {
     const errore = document.createElement("h1"); 
     const messaggio = document.createTextNode("Nessun risultato!"); 
     errore.appendChild(messaggio); 
     album.appendChild(errore);}
     num_results=5;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggiamo info
     const album_data = results[i];
     const nome = album_data.name;
     console.log(nome);
     const image = album_data.images[0].url;
     const album = document.createElement('div');
     album.classList.add('album');
     const img = document.createElement('img');
     img.src = image;
     const caption = document.createElement('div');
     caption.textContent = nome;
     
      // Aggiungiamo immagine e didascalia al div
     album.appendChild(img);
     album.appendChild(caption);
     library.appendChild(album)
     
      // Aggiungiamo il div alla libreria
    }
   
 }
 function search(event)
 {
     // Impedisci il submit del form
      event.preventDefault();
     // Leggi valore del campo di testo
     const content = document.querySelector('#content').value;
     const text = encodeURIComponent(content);
     const city = 'catania'
         console.log('Eseguo ricerca elementi riguardanti: ' + text);
      // verifico che sia stato effettivamente inserito del testo
      if(content) {
      fetch(foursquare_api + text, options).then(onResponse).then(onJson_eventi)
    }
   else {
       alert("Inserisci il testo per cui effettuare la ricerca");
 }
 }
    
  
 const options = {
       method: 'GET',
       headers: {
         accept: 'application/json',
         Authorization: 'fsq31iFMJSL+NI/JTKEnJTAKqEMhg3En8xcNd2NNPAI8NNo='
       }
 }
 
 const foursquare_api ='https://api.foursquare.com/v3/places/search?near='; //mi restituisce ristoranti e luoghi vicini a una data località
 const form = document.querySelector('#search_content');
 form.addEventListener('submit', search)
 
 
 
 
 function getToken(json)
 {
     token_data = json;
     console.log(json);
 }
 
 function onTokenResponse(response) {
   return response.json();
 }
 
 let token;
 
 function onTokenJson(json){
   console.log(json);
   token = json.access_token;
 
 }
 
 function onTokenResponse(response){
   return response.json();
 }
 
 const client_id = 'bbc717012187473cb36fb971b52085d7';
 const client_secret = '34681bd4429048b1842a98f946e32932';
 
 fetch('https://accounts.spotify.com/api/token', 
 {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
 }).then(onTokenResponse).then(onTokenJson)
 