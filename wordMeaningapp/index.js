let inputbox=document.querySelector('input')
const searchbtn=document.querySelector('button')
const word=document.querySelector('.word')
const adjective=document.querySelector('.adjective')
const def_meaning=document.querySelector('.def-meaning')
const sentence=document.querySelector('.sentence')
const resultcontainer=document.querySelector('.result-container')
const verb=document.querySelector('.verb')
const pronouns=document.querySelector('.pronouns')
const soundplaybtn=document.querySelector('.soundbtn')
const sound=document.querySelector('.sound')
const error_container=document.querySelector('.error-container')
const empty=document.querySelector('.empty')


//fetching the data
    const  getwordmeaning = async (Word)=>{
      try{
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`;
      const response= await fetch(url);
      const data=await response.json();
      console.log(data);
      
      
      resultcontainer.classList.add('showResult')
      error_container.classList.remove('show-error')
     
      word.innerText=data[0].word
      verb.innerText=`${data[0].meanings[0].partOfSpeech}`
      pronouns.innerText=`${data[0].phonetics[0] ?.text || data[0].phonetics[1]?.text || data[0].phonetics[2]?.text || "" }`
      def_meaning.innerText=data[0].meanings[0].definitions[0].definition;
      sentence.innerText=`${data[0].meanings[0].definitions[0].example || ""}`
      sound.src = `${data[0].phonetics[0]?.audio ||  data[0].phonetics[1]?.audio || data[0].phonetics[2]?.audio || "" }`
    
      //to play sound
     soundplaybtn.addEventListener('click',()=>{
      sound.play()  
       
    })
     }catch{ // if word is not found
      error_container.classList.add('show-error')
      resultcontainer.classList.remove('showResult')

     }
    
      }
  
//taking the word in the input to fetch data
searchbtn.addEventListener('click',(e)=>{
    let inputvalue=inputbox.value
    getwordmeaning(inputvalue)
    inputbox.value=''
    empty.innerText=''
   
})