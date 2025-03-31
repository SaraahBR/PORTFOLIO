document.addEventListener('DOMContentLoaded', function() {
  const consoleElem = document.getElementById('console');

  // Textos que serão "digitados"
  const messages = ["Hello, World... ☕︎", "Eu sou a Sarah e você está no meu portfólio, prazer! ♡"];
  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeText() {
    if (messageIndex < messages.length) {
      const currentMsg = messages[messageIndex];
      if (!deleting) {
        if (charIndex < currentMsg.length) {
          consoleElem.textContent += currentMsg.charAt(charIndex);
          charIndex++;
          setTimeout(typeText, 100);
        } else {
          if (messageIndex === 0) {
            deleting = true;
            setTimeout(typeText, 1000);
          }
        }
      } else {
        if (charIndex > 0) {
          consoleElem.textContent = currentMsg.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeText, 50);
        } else {
          deleting = false;
          messageIndex++;
          setTimeout(typeText, 500);
        }
      }
    }
  }

  setTimeout(typeText, 500);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(elem => {
    observer.observe(elem);
  });

  // --- Jogo da Cobrinha ---
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  const tileCount = 20;
  const tileSize = canvas.width / tileCount;

  let gameInterval = null;
  let gameRunning = false;

  let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  let velocity = { x: 0, y: 0 };
  let food = generateFood();

  // --- DEMONSTRAÇÃO ANTES DO JOGO ---
  let demoInterval = null;
  let demoSnake = [];
  let demoVelocity = { x: 1, y: 0 };
  let demoFood = {};
  let demoStep = 0;

  function startDemo() {
    demoSnake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    demoVelocity = { x: 1, y: 0 };
    demoFood = { x: 10, y: 5 };
    demoStep = 0;

    demoInterval = setInterval(drawDemo, 200);
  }

  function drawDemo() {
    const head = {
      x: (demoSnake[0].x + demoVelocity.x + tileCount) % tileCount,
      y: (demoSnake[0].y + demoVelocity.y + tileCount) % tileCount
    };

    demoStep++;
    if (demoStep % 20 === 0) {
      const directions = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 }
      ];
      demoVelocity = directions[Math.floor(Math.random() * directions.length)];
    }

    demoSnake.unshift(head);

    if (head.x === demoFood.x && head.y === demoFood.y) {
      demoFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } else {
      demoSnake.pop();
    }

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    demoSnake.forEach(segment => {
      ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 1, tileSize - 1);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(demoFood.x * tileSize, demoFood.y * tileSize, tileSize - 1, tileSize - 1);
  }

  // --- JOGO PRINCIPAL ---
  function drawGame() {
    const headX = snake[0].x + velocity.x;
    const headY = snake[0].y + velocity.y;

    if (velocity.x === 0 && velocity.y === 0) return;

    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
      endGame();
      return;
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === headX && snake[i].y === headY) {
        endGame();
        return;
      }
    }

    snake.unshift({ x: headX, y: headY });

    if (headX === food.x && headY === food.y) {
      food = generateFood();
    } else {
      snake.pop();
    }

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    ctx.fillStyle = "lime";
    snake.forEach(segment => {
      ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
  }

  function generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  function endGame() {
    clearInterval(gameInterval);
    alert("Game Over! 😅");
    resetGame();
  }

  function resetGame() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    velocity = { x: 0, y: 0 };
    food = generateFood();
    gameRunning = false;
    document.getElementById('startSnake').style.display = 'block';
  }

  document.addEventListener('keydown', function(e) {
    if (!gameRunning) return;

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowLeft":
        if (velocity.x !== 1) velocity = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (velocity.x !== -1) velocity = { x: 1, y: 0 };
        break;
      case "ArrowUp":
        if (velocity.y !== 1) velocity = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (velocity.y !== -1) velocity = { x: 0, y: 1 };
        break;
    }
  });

  document.getElementById('startSnake').addEventListener('click', function() {
    if (!gameRunning) {
      clearInterval(demoInterval); // Para a demonstração
      gameRunning = true;
      document.getElementById('startSnake').style.display = 'none';
      gameInterval = setInterval(drawGame, 100);
    }
  });

  resetGame(); // Inicializa
  startDemo(); // Inicia demonstração
});
