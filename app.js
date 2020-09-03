document.addEventListener("DOMContentLoaded", function () {
  let xpos1 = 0;
  let xpos2 = 0;
  let ypos1 = 0;
  let ypos2 = 0;
  let speed1x = 5;
  let speed1y = 5;
  let speed2x = -5;
  let speed2y = -5;
  const ballOne = document.querySelector(".ball1");
  const ballTwo = document.querySelector(".ball2");
  function move() {

    let x1 = ballOne.offsetLeft;
    let y1 = ballOne.offsetTop;
    let x2 = ballTwo.offsetLeft; 
    let y2 = ballTwo.offsetTop;


    function checkEdgeCollision(){

      // Monitering X Axis Movement of First Ball


      if (xpos1 >= 540) {  
        speed1x *= -1;
      } else if (xpos1 <= 0) {
        speed1x *= -1;  
        xpos1 = 0;}
  
      // Monitering X axis Movement of Second Ball


      if (xpos2 <= -540) {
          speed2x *=-1;
        } else if (xpos2 >= 0) {
          speed2x *=-1;
          xpos2 = 0;}

      // Monitering Y Axis Movement of First Ball


      if (ypos1 >= 340) {  
        speed1y *=-1;  
      } else if (ypos1 < 0) { 
        speed1y *= -1;  
      }
  
      // Monitering Y Axis Movement of Second Ball


      if (ypos2 >= 340) {
        speed2y *=-1;
      } else if (ypos2 <= 0) {
        speed2y *= -1;
        ypos2 = 0;}
  
      }
    

    
    function update(){
    xpos1 += speed1x;
    xpos2 += speed2x;
    ypos1 += speed1y;
    ypos2 += speed2y;
    ballTwo.style.top = `${ypos2}px`;
    ballOne.style.top = `${ypos1}px`;
    ballOne.style.left = `${xpos1}px`;
    ballTwo.style.left = `${xpos2}px`;
    }

    checkEdgeCollision();

    update();


    window.requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // Check Collision
});
