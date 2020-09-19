document.addEventListener("DOMContentLoaded", function () {
  let u1x = 3;
  let u1y = -6;
  let u2x = 5;
  let u2y = -9;
  const ballOne = document.querySelector(".ball1");
  const ballTwo = document.querySelector(".ball2");
  const box = document.querySelector(".box");
  let leftEdge = box.getBoundingClientRect().left;
  let rightEdge = box.getBoundingClientRect().right;
  let topEdge = box.getBoundingClientRect().top;
  let bottomEdge = box.getBoundingClientRect().bottom;
  let radius1 = ballOne.getBoundingClientRect().height;
  let radius2 = ballTwo.getBoundingClientRect().height;
  // ballTwo.style.left = `${leftEdge + 2 * radius2}px`;
  let xpos1 = 0; //ballOne.offsetLeft;
  let xpos2 = 0;
  let ypos1 = 0; //ballOne.offsetTop;
  let ypos2 = 0; //ballTwo.offsetTop;
  function move() {
    x1 = ballOne.getBoundingClientRect().left;
    y1 = ballOne.getBoundingClientRect().top;
    x2 = ballTwo.getBoundingClientRect().left;
    y2 = ballTwo.getBoundingClientRect().top;

    collision();

    checkEdgeCollision();

    update();

    window.requestAnimationFrame(move);
  }
  requestAnimationFrame(move);


  // Check Collision Between Edge

  function checkEdgeCollision() {
    // Monitering X Axis Movement of First Ball

    if (x1 + radius1 >= rightEdge) {
      xpos1 -= x1+radius1-rightEdge
      ballOne.style.left = `${xpos1}px`;
      u1x *= -1;
    } else if (x1 <= leftEdge) {
      xpos1 += leftEdge-x1
      ballOne.style.left = `${xpos1}px`;
      u1x *= -1;
    }

    // Monitering Y Axis Movement of First Ball

    if (y1 + radius1 >= bottomEdge) {
      ypos1 += y1 + radius1 - bottomEdge
      ballOne.style.bottom = `${ypos1}px`;
      u1y *= -1;
    } else if (y1 <= topEdge) {
      ypos1 -= topEdge - y1;
      ballOne.style.bottom = `${ypos1}px`;
      u1y *= -1;
    }

    // Monitering X axis Movement of Second Ball

    if (x2 + radius2 >= rightEdge) {
      xpos2 -= x2+radius2-rightEdge
      ballTwo.style.left = `${xpos2}px`;
      u2x *= -1;
    } else if (x2 <= leftEdge) {
      xpos2 += leftEdge - x2;
      ballTwo.style.left = `${xpos2}px`;
      u2x *= -1;
    }

    // Monitering Y Axis Movement of Second Ball

    if (y2 + radius2 >= bottomEdge) {
      ypos2 += y2 + radius2 - bottomEdge
      ballTwo.style.bottom = `${ypos2}px`;
      u2y *= -1;
    } else if (y2 <= topEdge) {
      ypos2 -= topEdge - y2
      ballTwo.style.bottom = `${ypos2}px`;
      u2y *= -1;
    }
  }


  // Update Values

  function update() {
    xpos1 += u1x;
    xpos2 += u2x;
    ypos1 += u1y;
    ypos2 += u2y;
    ballTwo.style.bottom = `${ypos2}px`;
    ballOne.style.bottom = `${ypos1}px`;
    ballOne.style.left = `${xpos1}px`;
    ballTwo.style.left = `${xpos2}px`;

    safetyCollision();
  }


  // Collision Between Balls

  function collision() {
    if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 60) {
      let theta = Math.atan2(( y1-y2),(x2 - x1));

      console.log("x1,y1,x2,y2 " +  x1,y1,x2,y2)
      
      let nu1x = u1x * Math.cos(theta) + u1y * Math.sin(theta);
      let nu1y = u1y * Math.cos(theta) - u1x * Math.sin(theta);

      let nu2x = u2x * Math.cos(theta) + u2y * Math.sin(theta);
      let nu2y =  u2y * Math.cos(theta)-u2x * Math.sin(theta);


      console.log("Theta is: " +theta+ "Ux1, Uy1, Ux2, Uy2 is: " + u1x ,u1y , u2x, u2y
      +"nu1x, nu1y, nu2x, nu2y is: " + nu1x , nu1y, nu2x, nu2y)
      u1x = nu2x * Math.cos(theta) - nu1y * Math.sin(theta);
      u1y = nu1y * Math.cos(theta) + nu2x * Math.sin(theta);

      u2x = nu1x * Math.cos(theta) - nu2y * Math.sin(theta);
      u2y = nu2y * Math.cos(theta) + nu1x * Math.sin(theta);

      let r = Math.floor(Math.random()*256)+0;
      let g = Math.floor(Math.random()*256)+0;
      let b = Math.floor(Math.random()*256)+0;

      // ballOne.style.backgroundColor = `rgb(${r},${g},${b})`
      // ballTwo.style.backgroundColor = `rgb(${g},${b},${r})`

      console.log("Final u1x, u1y, u2x, u2y is: "+ u1x, u1y, u2x, u2y)

    }
  }

  function safetyCollision() {
    if(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < 60){
    let theta = Math.atan2(( y1-y2),(x2 - x1));
    let overlap = 60 - Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    
    if(u1x<0){
      xpos1 -= overlap* Math.cos(theta)
    } else {
      xpos1 += overlap* Math.cos(theta)
    }

    if(u1y<0){
      ypos1 -= overlap* Math.sin(theta)
    } else{
      ypos1 += overlap* Math.sin(theta)
    }

    if(u2x<0){
      xpos2 -= overlap* Math.cos(theta)
    } else{
      xpos2 += overlap* Math.cos(theta)
    }

    if(u2y<0){
      ypos2 -= overlap* Math.sin(theta)
    } else{
      ypos2 += overlap* Math.sin(theta)
    }
    

    ballTwo.style.bottom = `${ypos2}px`;
    ballOne.style.bottom = `${ypos1}px`;
    ballOne.style.left = `${xpos1}px`;
    ballTwo.style.left = `${xpos2}px`;
    }
  }
});
