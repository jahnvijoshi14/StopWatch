
// using IIFE
(() => { 

   const hour=document.getElementById("hour");
   const minutes= document.getElementById("minute");
   const second=document.getElementById("second");
   


   let hourCount = 00;
   let minuteCount = 00;
   let secondCount = 00;
   let timer=false;
   let mySound = new Sound("assets/sound.mp3");
   let interval;
   let isPlaying=false;



 //adding audio to html 
 function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    
    //this will append the audio as the last element od the document
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }

    this.stop = function(){
      this.sound.pause();
      this.sound.currentTime = 0;  
    }
  }






   //start function to start the timer
   function start()
   {

      if(timer && isPlaying){
        
        mySound.play();
        
        secondCount++;

        if(secondCount==60)
        {
            minuteCount++;
            secondCount=0;
        }

        if(minuteCount==60)
        {
            hourCount++;
            minuteCount = 0;
            secondCount=0;
        }

        let secondDisplay= secondCount;
        let minuteDisplay= minuteCount;
        let hourDisplay= hourCount;

       
        if (hourCount < 10) {
            hourDisplay = "0" + hourDisplay;
        }
  
        if (minuteCount < 10) {
            minuteDisplay = "0" + minuteDisplay;
        }
  
        if (secondCount < 10) {
            secondDisplay = "0" + secondDisplay;
        }
  
        hour.innerHTML= hourDisplay+":";
        minutes.innerHTML=minuteDisplay+":";
        second.innerHTML=secondDisplay;

        interval=setTimeout(start, 1000);
      }
   }
   
   
   
   //reset function to reset the timer
   function reset()
   {
    
    hour.innerHTML="00:";
    minutes.innerHTML="00:";
    second.innerHTML="00";
    timer=false;
   }
    

   //clicking of three buttons is handled here 
  function responding(event)
  {
        
        if(event.target.id==="reset"){
           if(isPlaying)
           {
            mySound.stop();
           
            clearTimeout(interval);
            isPlaying=false;
           }
           document.getElementById("start").disabled=false;
           timer=false;
           hourCount=0;
           minuteCount=0;
           secondCount=0
           reset();
        }

        if(event.target.id==="start"){
            
            timer=true;
            isPlaying=true;
            document.getElementById("start").disabled=true
            start();
        }

        if(event.target.id==="pause"){
            if(isPlaying)
            {
             
             mySound.stop();
             clearTimeout(interval); 
            
             isPlaying=false;
            }
            document.getElementById("start").disabled=false;
            timer=false;
        }

  }


    //using event delegation
    document.addEventListener('click', responding)
    

 })(); 