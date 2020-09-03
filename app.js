document.addEventListener("DOMContentLoaded", function () {
  let xpos1 = 0;
  let xpos2 = 0;
  let ypos1 = 0;
  let ypos2 = 0;
  let togglex1 = true;
  let togglex2 = true;
  let toggley1 = true;
  let toggley2 = true;
  let speed1x = 5;
  let speed1y = -5;
  let speed2x = -5;
  let speed2y = -5;
  const ballOne = document.querySelector(".ball1");
  const ballTwo = document.querySelector(".ball2");
  function move() {

    let x1 = ballOne.offsetLeft;
    let y1 = ballOne.offsetTop;
    let x2 = ballTwo.offsetLeft; 
    let y2 = ballTwo.offsetTop;

    // Monitering X axis Movement of First Ball
    if (xpos1 >= 800 - 60) {  
      speed1x = -speed1x;
      togglex1 = !togglex1;
    } else if (xpos1 < 0) {
      speed1x = - speed1x;  
      xpos1 = 0;
      togglex1 = !togglex1;}
    else if(collision()){
        colliResult()
    }
    if(togglex1){
      xpos1 += speed1x;
      ballOne.style.left = `${xpos1}px`;
    } else {
      xpos1 += speed1x;
      ballOne.style.left = `${xpos1}px`;
    }



    // Monitering X axis Movement of Second Ball
    if (xpos2 <= -740) {
        speed2x = -speed2x;
        togglex2 = !togglex2;
      } else if (xpos2 > 0) {
        speed2x = -speed2x
        xpos2 = 0;
        togglex2 = !togglex2;}
      else if(collision()){
        colliResult()
    }
      if (togglex2) {
        xpos2 += speed2x;
        ballTwo.style.left = `${xpos2}px`;
      }else { 
        xpos2 += speed2x;
        ballTwo.style.left = `${xpos2}px`;
      }

    // Monitering Y Axis Movement of First Ball
    if (ypos1 >= 400 - 60) {  
      speed1y = -speed1y;  
      toggley1 = !toggley1;
    } else if (ypos1 <= 0) { 
      speed1y = -speed1y;  
      ypos1 = 0;
      toggley1 = !toggley1;}
    else if(collision()){
        colliResult()
    }
    if (toggley1) {
      ypos1 += speed1y;
      ballOne.style.top = `${ypos1}px`;
    } else {
      ypos1 += speed1y;
      ballOne.style.top = `${ypos1}px`;
    }

    // Monitering Y Axis Movement of Second Ball
    if (ypos2 >= 400 - 60) {
      toggley2 = !toggley2;
    } else if (ypos2 <= 0) {
      ypos2 = 0;
      toggley2 = !toggley2;}
    else if(collision()){
        colliResult()
    }
    if (toggley2) {
      ypos2 += speed2y;
      ballTwo.style.top = `${ypos2}px`;
    } else {
       ypos2 -= speed2y;
      ballTwo.style.top = `${ypos2}px`;
    }



    // Check Collision
    function collision() {
        if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 60) {
          return true;
        } else return false;
      }


      function colliResult(){

        // console.log(speed1x,speed1y,speed2x,speed2y,x1,y1,x2,y2)

        const theta = Math.atan2((y2-y1),(x2-x1))


        let nspeed1x = speed1x*Math.cos(theta) + speed1y*Math.sin(theta)
        let nspeed1y = -speed1x*Math.sin(theta) + speed1y*Math.cos(theta)

        let nspeed2x = speed2x*Math.cos(theta) + speed2y*Math.sin(theta)
        let nspeed2y = -speed2x*Math.sin(theta) + speed2y*Math.cos(theta)
        

        let temp = nspeed1x
        nspeed1x = nspeed2x
        nspeed2x = temp

        speed1x = nspeed1x*Math.cos(theta) - nspeed1y*Math.sin(theta)
        speed1y = nspeed1y*Math.cos(theta) + nspeed1x*Math.sin(theta)
        
        speed2x = nspeed2x*Math.cos(theta) - nspeed2y*Math.sin(theta)
        speed2y = nspeed2y*Math.cos(theta) + nspeed2x*Math.sin(theta)
        // console.log(speed1x,speed1y,speed2x,speed2y, theta)
        

      }

    window.requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // Check Collision
});
