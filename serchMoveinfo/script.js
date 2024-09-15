const searchform=document.querySelector('form')
const moviecontainer=document.querySelector('.movie-container')
const inputBox=document.querySelector('.inputBox')

//function to fetch movie details using omdb api
const getMovieinfo = async  (movie)=>{
   try{
    const myapikey="26ce4fad"
    const url=`https://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
   
    //fetch data using fetch method
    const response= await fetch(url);
    if(!response.ok){
        throw new Error("unable to fetch movie data")
    }
    const data= await response.json()
    console.log(data);
    showmoviedata(data);
   }
   catch(error){
    showerror('Movie not found!!!')
   }
    
}

//function to show error massege
const showerror=(massege)=>{
    moviecontainer.innerHTML=`<h2>${massege}🎬</h2>`
    moviecontainer.classList.add('noBackground')
}




//function to show movie data on secreen

const showmoviedata=(data)=>{
    moviecontainer.innerHTML=''
    moviecontainer.classList.remove('noBackground')
    //use Destructuring assignment to extract properties from data object
  const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;
  const movieElement=document.createElement('div')
  movieElement.classList.add('movie-info') 
  movieElement.innerHTML=`<h2>${Title}</h2>
                          <p><strong>Rating: &#11088</strong>${imdbRating}</p>`

//creat second div for display genre
const movieGenreElement=document.createElement('div')
movieGenreElement.classList.add('movie-Genre') 
Genre.split(",").forEach(elements=>{
    const p=document.createElement('p');
    p.innerText=elements;
    movieGenreElement.appendChild(p)
})

movieElement.appendChild(movieGenreElement)
movieElement.innerHTML+=` <p><strong>Realeased Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>plot: </strong>${Plot}</p> `  
                            
   //creat a div for movie poster   
  const movieposterElement=document.createElement('div')   
  movieposterElement.classList.add('movieposter-Element')
  movieposterElement.innerHTML=`<img src="${Poster}">`
  
moviecontainer.appendChild(movieposterElement)
moviecontainer.appendChild(movieElement)

}

 moviecontainer.classList.add('noBackground')


 //function to handle form submission

 const handleFormSubmission=(e)=>{
    e.preventDefault()
    const movieName=inputBox.value.trim()
    if(movieName!==''){
        getMovieinfo(movieName)
    }
    else{
        showerror('Enter the movie name to get information')
    }
 }
//adding event listner to serch form 
searchform.addEventListener('submit',handleFormSubmission);