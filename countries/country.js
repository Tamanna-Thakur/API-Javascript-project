const countryname=(new URLSearchParams(location.search).get('name'));
const flagImage=document.querySelector('.country-deatails img')
const countryNameH1=document.querySelector('.country-deatails h1')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')
const Region=document.querySelector('.Region')
const SubRegion=document.querySelector('.Sub-Region')
const  Capital=document.querySelector('.capital')
const  TopLavelDomain=document.querySelector('.Top-Lavel-Domain')
const Currencies=document.querySelector('.Currencies')
const Language=document.querySelector('.Language')
const borderCountries=document.querySelector('.border-countries')
const themechanger=document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{
    console.log(country);
    flagImage.src=country.flags.svg
    countryNameH1.innerText=country.name.common
    population.innerText=country.population.toLocaleString('en-IN')
    Region.innerText=country.region
    Capital.innerText=country.capital?.[0]
    TopLavelDomain.innerText=country.tld.join(', ')
    
   if(country.subregion){
    SubRegion.innerText=country.subregion
   }

   if(country.capital){
    Capital.innerText=country.capital?.[0]
   }


    if(country.currencies){
        Currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(', ')
    }
    if (country.languages) {
        Language.innerText = Object.values(country.languages).join(', ')
      }
  

    if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
      } else {
        nativeName.innerText = country.name.common
      }

      if(country.borders){
        country.borders.forEach((border)=>{
          console.log(border);
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res)=>res.json())
          .then(([borderCountry])=>{
            const borderCountryTag=document.createElement('a')
            borderCountryTag.innerText=borderCountry.name.common
            borderCountries.append(borderCountryTag)
            borderCountryTag.href=`country.html?name=${borderCountry.name.common}`
            console.log(borderCountryTag);
          })
        })
      }
       
        
    })



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
      flagImage.style.borderColor=''
      localStorage.setItem('darkmodeinabled',true)
      }
      else{
          themechanger.innerHTML='<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark mode'
          localStorage.setItem('darkmode',false)
      }
     
      
    })
    
    
      
    