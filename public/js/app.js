
console.log('client side javascript file is loaded');

const messageOne = document.querySelector('#message-1');
const messageTwo =document.querySelector('#message-2')





document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const city=document.querySelector('input').value;

    messageOne.textContent='Loading...'
    messageTwo.textContent='';
    console.log(city);
    fetch('http://localhost:3000/weather?address='+city).then((response)=>{
    
    response.json().then((data)=>{

        if(data.error){
            messageOne.textContent=data.error;

        }else{
            //console.log(data)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcast

        }
        

    })


})
    

});