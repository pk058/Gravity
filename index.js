document.addEventListener("DOMContentLoaded", function () {
  function Ball(x, y, radius) {
    this.radius = radius;
    this.dx = 5;
    this.dy = 5;
    // mass is that of a sphere as opposed to circle.
    // it *does* make a difference.
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(
        Math.round(this.x),
        Math.round(this.y),
        this.radius,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
      ctx.stroke();
      ctx.closePath();
    };
    this.speed = function () {
      // magnitude of velocity vector
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function () {
      //angle of ball with the x axis
      return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
      // only for masturbation purposes, not rly used for computation.
      return 0.5 * this.mass * this.speed() * this.speed();
    };
    this.onGround = function () {
      return this.y + this.radius >= canvas.height;
    };
  }

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var objArray = [];

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function wallCollision(ball) {
    if (
      ball.x - ball.radius + ball.dx < 0 ||
      ball.x + ball.radius + ball.dx > canvas.width
    ) {
      ball.dx *= -1;
    }
    if (
      ball.y - ball.radius + ball.dy < 0 ||
      ball.y + ball.radius + ball.dy > canvas.height
    ) {
      ball.dy *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
    }
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
    }
  }

  function ballCollision() {
    for (var obj1 in objArray) {
      for (var obj2 in objArray) {
        if (
          obj1 !== obj2 &&
          distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0
        ) {
          var theta1 = objArray[obj1].angle();
          var theta2 = objArray[obj2].angle();
          var phi = Math.atan2(
            objArray[obj2].y - objArray[obj1].y,
            objArray[obj2].x - objArray[obj1].x
          );
          var m1 = objArray[obj1].mass;
          var m2 = objArray[obj2].mass;
          var v1 = objArray[obj1].speed();
          var v2 = objArray[obj2].speed();

          var dx1F =((v1 * Math.cos(theta1 - phi) * (m1 - m2) +2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2)) *Math.cos(phi) + v1 * Math.sin(theta1 - phi) * -Math.sin(phi);
          var dy1F = ((v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) /(m1 + m2)) *Math.sin(phi) +v1 * Math.sin(theta1 - phi) * Math.cos(phi);
          var dx2F = ((v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) /(m1 + m2)) *Math.cos(phi) +v2 * Math.sin(theta2 - phi) * -Math.sin(phi);
          var dy2F =((v2 * Math.cos(theta2 - phi) * (m2 - m1) +2 * m1 * v1 * Math.cos(theta1 - phi)) /(m1 + m2)) * Math.sin(phi) +v2 * Math.sin(theta2 - phi) * Math.cos(phi);

          objArray[obj1].dx = dx1F;
          objArray[obj1].dy = dy1F;
          objArray[obj2].dx = dx2F;
          objArray[obj2].dy = dy2F;
        }
      }
      wallCollision(objArray[obj1]);
    }
  }

  function staticCollision() {
    for (var obj1 in objArray) {
      for (var obj2 in objArray) {
        if (
          obj1 !== obj2 &&
          distance(objArray[obj1], objArray[obj2]) <
            objArray[obj1].radius + objArray[obj2].radius
        ) {
          var theta = Math.atan2(
            objArray[obj1].y - objArray[obj2].y,
            objArray[obj1].x - objArray[obj2].x
          );
          var overlap =
            objArray[obj1].radius +
            objArray[obj2].radius -
            distance(objArray[obj1], objArray[obj2]);
          var smallerObject =
            objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2;
          objArray[smallerObject].x -= overlap * Math.cos(theta);
          objArray[smallerObject].y -= overlap * Math.sin(theta);
        }
      }
    }
  }

  function moveObjects() {
    for (var obj in objArray) {
      objArray[obj].x += objArray[obj].dx;
      objArray[obj].y += objArray[obj].dy;
    }
  }

  function drawObjects() {
    for (var obj in objArray) {
      objArray[obj].draw();
    }
  }

  function draw() {
    clearCanvas();
    // canvasBackground();
    moveObjects();
    drawObjects();
    staticCollision();
    ballCollision();
    requestAnimationFrame(draw);
    console.log("Started");
  }

  // spawn the initial small thingies.
  for (i = 0; i < 5; i++) {
    objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
  }

  function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
  }

  function randomX() {
    x = Math.floor(Math.random() * canvas.width);
    if (x < 30) {
      x = 30;
    } else if (x + 30 > canvas.width) {
      x = canvas.width - 30;
    }
    return x;
  }

  function randomY() {
    y = Math.floor(Math.random() * canvas.height);
    if (y < 30) {
      y = 30;
    } else if (y + 30 > canvas.height) {
      y = canvas.height - 30;
    }
    return y;
  }

  function randomRadius() {
    r = Math.ceil(Math.random() * 30 + 10);
    //r = 2;
    return r;
  }

  function distanceNextFrame(a, b) {
    return (
      Math.sqrt(
        (a.x + a.dx - b.x - b.dx) ** 2 + (a.y + a.dy - b.y - b.dy) ** 2
      ) -
      a.radius -
      b.radius
    );
  }

  function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  draw();
});
