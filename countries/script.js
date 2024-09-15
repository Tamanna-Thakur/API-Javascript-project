const filterByRegion=document.querySelector('.filter-by-region')
const countriesContainer=document.querySelector('.country-container')
const searchinput=document.querySelector('.search-conianer input')
const themechanger=document.querySelector('.theme-changer')
let allcountriesdata;
fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  //  .then(renderCuntries)
  .then((data) => {
    renderCuntries(data)
    allcountriesdata=data
    
  })

  filterByRegion.addEventListener('change', (e) => {
    console.log(filterByRegion.value);
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
      .then((res) => res.json())
      .then(renderCuntries)
  })
  

function renderCuntries(data){
    countriesContainer.innerHTML=''
    data.forEach((country) => {
        console.log(country);
    const countryCard=document.createElement('a')
    countryCard.classList.add('cuntry-card')
    countryCard.href=`/countries/country.html?name=${country.name.common}`
   const CardHtml=`
                   <img src="${country.flags.svg}" alt="" srcset="">
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                     <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                     <p><b>Region: </b>${country.region}</p>
                     <p><b>Capital: </b>${country.capital?.[0]}</p>
                </div>
                 `

 countryCard.innerHTML=CardHtml     
 countriesContainer.append(countryCard)
        
    });
}

searchinput.addEventListener('input',(e)=>{
    console.log(e.target.value);
    // console.log(allcountriesdata);
    const filteredCountries=allcountriesdata.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCuntries( filteredCountries)
})

//retrive the data from local storeg


const storedarkmode=JSON.parse(localStorage.getItem('darkmodeinabled'))
if(storedarkmode){
  document.body.classList.add('dark')
  themechanger.innerHTML='<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;light mode'
}
else{
  themechanger.innerHTML='<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark mode'
}



//dark mode and light mode

themechanger.addEventListener('click',()=>{
  document.body.classList.toggle('dark')
  const darkmodeinabled=document.body.classList.contains('dark')
  if(darkmodeinabled){
  themechanger.innerHTML='<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;light mode'
  localStorage.setItem('darkmodeinabled',true)
  }
  else{
      themechanger.innerHTML='<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark mode'
      localStorage.setItem('darkmode',false)
  }
 
  
})


  
