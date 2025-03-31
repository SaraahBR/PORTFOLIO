document.addEventListener('DOMContentLoaded', function () {
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

  // Fade-in ao rolar
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
  let flashCounter = 0;

  function startDemo() {
    demoSnake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    demoVelocity = { x: 1, y: 0 };
    demoFood = generateDemoFood();
    flashCounter = 0;
    demoInterval = setInterval(drawDemo, 200);
  }

  function generateDemoFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } while (demoSnake.some(s => s.x === food.x && s.y === food.y));
    return food;
  }

  function drawDemo() {
    const head = demoSnake[0];
    let targetDirection = { x: 0, y: 0 };

    // Direção simples até a fruta
    if (head.x < demoFood.x) targetDirection = { x: 1, y: 0 };
    else if (head.x > demoFood.x) targetDirection = { x: -1, y: 0 };
    else if (head.y < demoFood.y) targetDirection = { x: 0, y: 1 };
    else if (head.y > demoFood.y) targetDirection = { x: 0, y: -1 };

    const nextX = head.x + targetDirection.x;
    const nextY = head.y + targetDirection.y;

    // Evita parede
    if (nextX < 0 || nextY < 0 || nextX >= tileCount || nextY >= tileCount) {
      const safeMoves = [
        { x: 0, y: -1 }, { x: 1, y: 0 },
        { x: 0, y: 1 }, { x: -1, y: 0 }
      ];
      for (const move of safeMoves) {
        const newX = head.x + move.x;
        const newY = head.y + move.y;
        const noWall = newX >= 0 && newX < tileCount && newY >= 0 && newY < tileCount;
        const noBody = !demoSnake.some(s => s.x === newX && s.y === newY);
        if (noWall && noBody) {
          targetDirection = move;
          break;
        }
      }
    }

    const newHead = {
      x: head.x + targetDirection.x,
      y: head.y + targetDirection.y
    };

    if (demoSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
      restartDemo(); return;
    }

    demoSnake.unshift(newHead);

    if (newHead.x === demoFood.x && newHead.y === demoFood.y) {
      demoFood = generateDemoFood();
    } else {
      demoSnake.pop();
    }

    // Desenho
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Frutinha brilhando
    flashCounter++;
    ctx.fillStyle = flashCounter % 8 < 4 ? "red" : "orangered";
    ctx.fillRect(demoFood.x * tileSize, demoFood.y * tileSize, tileSize - 1, tileSize - 1);

    // Cobra piscando suavemente no início
    const cor = flashCounter < 10 ? (flashCounter % 2 === 0 ? "#66ff66" : "lime") : "lime";
    ctx.fillStyle = cor;
    demoSnake.forEach(seg => {
      ctx.fillRect(seg.x * tileSize, seg.y * tileSize, tileSize - 1, tileSize - 1);
    });
  }

  function restartDemo() {
    clearInterval(demoInterval);
    setTimeout(startDemo, 300);
  }

  // --- JOGO REAL ---
  function drawGame() {
    const headX = snake[0].x + velocity.x;
    const headY = snake[0].y + velocity.y;

    if (velocity.x === 0 && velocity.y === 0) return;

    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
      endGame(); return;
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === headX && snake[i].y === headY) {
        endGame(); return;
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

  document.addEventListener('keydown', function (e) {
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

  document.getElementById('startSnake').addEventListener('click', function () {
    if (!gameRunning) {
      clearInterval(demoInterval);
      gameRunning = true;
      document.getElementById('startSnake').style.display = 'none';
      gameInterval = setInterval(drawGame, 100);
    }
  });

  resetGame();
  startDemo(); // Inicia a demonstração automaticamente
});
