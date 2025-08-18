import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomFoodType } from '../components/GameAssets';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150; // milliseconds

export const useGameLogic = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5, type: 'apple' });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'paused', 'gameOver'
  const [speed, setSpeed] = useState(GAME_SPEED);
  const [foodsEaten, setFoodsEaten] = useState([]);
  
  const gameLoopRef = useRef();
  const directionRef = useRef(direction);
  
  // Update direction reference when direction changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Generate random food position
  const generateFood = useCallback((currentSnake = snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
        type: getRandomFoodType()
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  }, [snake]);

  // Check if position is wall
  const isWall = useCallback((x, y) => {
    return x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE;
  }, []);

  // Check collision with self
  const checkSelfCollision = useCallback((head, body) => {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      const currentDirection = directionRef.current;
      
      // Move head
      head.x += currentDirection.x;
      head.y += currentDirection.y;
      
      // Check wall collision
      if (isWall(head.x, head.y)) {
        setGameState('gameOver');
        return currentSnake;
      }
      
      // Check self collision
      if (checkSelfCollision(head, newSnake)) {
        setGameState('gameOver');
        return currentSnake;
      }
      
      newSnake.unshift(head);
      
      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        // Food eaten - don't remove tail
        setScore(prevScore => prevScore + 10);
        setFoodsEaten(prev => [...prev, food.type]);
        setFood(generateFood(newSnake));
        
        // Increase speed slightly
        setSpeed(prevSpeed => Math.max(80, prevSpeed - 2));
      } else {
        // No food - remove tail
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [gameState, food, generateFood, isWall, checkSelfCollision]);

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      clearInterval(gameLoopRef.current);
    }
    
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, speed, moveSnake]);

  // Handle keyboard input
  const changeDirection = useCallback((newDirection) => {
    const currentDir = directionRef.current;
    
    // Prevent reverse direction
    if (
      (newDirection.x === -currentDir.x && newDirection.y === -currentDir.y) ||
      (newDirection.x === 0 && newDirection.y === 0)
    ) {
      return;
    }
    
    setDirection(newDirection);
  }, []);

  // Keyboard event handler
  const handleKeyPress = useCallback((event) => {
    if (gameState === 'gameOver' || gameState === 'menu') return;
    
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        changeDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        changeDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        changeDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        changeDirection({ x: 1, y: 0 });
        break;
      case ' ':
        event.preventDefault();
        setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
        break;
      default:
        break;
    }
  }, [gameState, changeDirection]);

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Game actions
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setSpeed(GAME_SPEED);
    setFoodsEaten([]);
    setGameState('playing');
  }, [generateFood]);

  const togglePause = useCallback(() => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  }, []);

  const quitGame = useCallback(() => {
    setGameState('menu');
    clearInterval(gameLoopRef.current);
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Touch controls for mobile
  const handleSwipe = useCallback((swipeDirection) => {
    const directions = {
      'up': { x: 0, y: -1 },
      'down': { x: 0, y: 1 },
      'left': { x: -1, y: 0 },
      'right': { x: 1, y: 0 }
    };
    
    if (directions[swipeDirection]) {
      changeDirection(directions[swipeDirection]);
    }
  }, [changeDirection]);

  // Get snake color index based on foods eaten
  const getSnakeColors = useCallback(() => {
    return snake.map((segment, index) => {
      if (index === 0) return 0; // Head always uses base color
      
      const foodIndex = Math.min(index - 1, foodsEaten.length - 1);
      return foodIndex >= 0 ? foodsEaten.length % 8 : 0;
    });
  }, [snake, foodsEaten]);

  return {
    // Game state
    snake,
    food,
    score,
    gameState,
    boardSize: BOARD_SIZE,
    foodsEaten,
    
    // Actions
    startGame,
    togglePause,
    quitGame,
    restartGame,
    handleSwipe,
    changeDirection,
    
    // Helpers
    getSnakeColors,
    isWall
  };
};
