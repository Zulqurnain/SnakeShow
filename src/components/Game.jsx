import React, { useState, useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { SnakeSegment, FoodItem, LavaWall } from './GameAssets';
import { useGameLogic } from '../hooks/useGameLogic';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { Play, Pause, RotateCcw, Trophy, X, Gamepad2 } from 'lucide-react';

const Game = () => {
  const {
    snake,
    food,
    score,
    gameState,
    boardSize,
    foodsEaten,
    startGame,
    togglePause,
    quitGame,
    restartGame,
    handleSwipe,
    getSnakeColors
  } = useGameLogic();

  const {
    isHighScore,
    addScore,
    getFormattedLeaderboard,
    getStats
  } = useLeaderboard();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  // Handle game over state
  useEffect(() => {
    if (gameState === 'gameOver') {
      setShowGameOver(true);
      if (isHighScore(score)) {
        // Auto-add score with anonymous name, user can change it
        addScore(score, playerName || 'Anonymous');
      }
    } else {
      setShowGameOver(false);
    }
  }, [gameState, score, isHighScore, addScore, playerName]);

  // Touch handlers for mobile controls
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY
    });
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStart.x || !touchStart.y) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        handleSwipe(deltaX > 0 ? 'right' : 'left');
      } else {
        // Vertical swipe
        handleSwipe(deltaY > 0 ? 'down' : 'up');
      }
    }

    setTouchStart({ x: 0, y: 0 });
  }, [touchStart, handleSwipe]);

  // Render game board
  const renderBoard = () => {
    const board = [];
    const snakeColors = getSnakeColors();

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const isSnakeSegment = snake.find(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isWall = x === 0 || x === boardSize - 1 || y === 0 || y === boardSize - 1;
        
        let content = null;
        let className = 'w-5 h-5 border border-gray-800/20';

        if (isWall) {
          content = <LavaWall />;
          className += ' p-0';
        } else if (isSnakeSegment) {
          const segmentIndex = snake.findIndex(segment => segment.x === x && segment.y === y);
          const isHead = segmentIndex === 0;
          const colorIndex = snakeColors[segmentIndex] || 0;
          content = <SnakeSegment isHead={isHead} colorIndex={colorIndex} opacity={0.9} />;
          className += ' p-0';
        } else if (isFood) {
          content = <FoodItem type={food.type} />;
          className += ' p-0.5 flex items-center justify-center';
        } else {
          className += ' bg-gray-900/10';
        }

        board.push(
          <div key={`${x}-${y}`} className={className}>
            {content}
          </div>
        );
      }
    }

    return board;
  };

  // Menu screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-8 p-8 bg-black/40 rounded-2xl backdrop-blur-sm">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse">
              🐍 SnakeShow
            </h1>
            <p className="text-xl text-gray-300">
              The most colorful snake game ever!
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={startGame}
              size="lg" 
              className="w-48 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transform transition hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              NEW GAME
            </Button>
            
            <Button 
              onClick={() => setShowLeaderboard(true)}
              variant="outline"
              size="lg"
              className="w-48 border-purple-500 text-purple-300 hover:bg-purple-500/20 font-bold py-3 px-8 rounded-full"
            >
              <Trophy className="w-5 h-5 mr-2" />
              LEADERBOARD
            </Button>
          </div>
          
          <div className="text-sm text-gray-400 space-y-2">
            <p>Use WASD or Arrow keys to move</p>
            <p>Swipe on mobile • Space to pause</p>
            <p>Eat food to grow and change colors! 🌈</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Game Header */}
      <div className="flex items-center justify-between w-full max-w-2xl mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-yellow-400 font-bold text-xl">Score: {score}</span>
          </div>
          <div className="bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-green-400 font-bold">Length: {snake.length}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={togglePause}
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
          >
            {gameState === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={restartGame}
            variant="outline"
            size="sm"
            className="border-green-500 text-green-300 hover:bg-green-500/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={quitGame}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-300 hover:bg-red-500/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="grid grid-cols-20 gap-0 bg-black/60 p-2 rounded-xl backdrop-blur-sm shadow-2xl"
        style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {renderBoard()}
      </div>

      {/* Game State Overlay */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-black/80 p-8 rounded-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">PAUSED</h2>
            <p className="text-gray-300 mb-6">Press Space or click Play to continue</p>
            <Button onClick={togglePause} className="bg-green-500 hover:bg-green-600">
              <Play className="w-5 h-5 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div></div>
        <Button
          onTouchStart={() => handleSwipe('up')}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-500/20 h-12"
        >
          ↑
        </Button>
        <div></div>
        
        <Button
          onTouchStart={() => handleSwipe('left')}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-500/20 h-12"
        >
          ←
        </Button>
        <div></div>
        <Button
          onTouchStart={() => handleSwipe('right')}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-500/20 h-12"
        >
          →
        </Button>
        
        <div></div>
        <Button
          onTouchStart={() => handleSwipe('down')}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-500/20 h-12"
        >
          ↓
        </Button>
        <div></div>
      </div>

      {/* Game Over Dialog */}
      <Dialog open={showGameOver} onOpenChange={setShowGameOver}>
        <DialogContent className="bg-black/90 border-red-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl text-red-400">Game Over!</DialogTitle>
            <DialogDescription className="text-gray-300">
              Your snake crashed! Final score: <span className="text-yellow-400 font-bold">{score}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {isHighScore(score) && (
              <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/50">
                <p className="text-yellow-300 font-bold">🎉 New High Score!</p>
                <p className="text-sm text-gray-300">Your score has been added to the leaderboard!</p>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button 
                onClick={restartGame}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              
              <Button 
                onClick={() => setShowLeaderboard(true)}
                variant="outline"
                className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-500/20"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
            
            <Button 
              onClick={() => {
                setShowGameOver(false);
                quitGame();
              }}
              variant="outline"
              className="w-full border-gray-500 text-gray-300 hover:bg-gray-500/20"
            >
              Back to Menu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="bg-black/90 border-purple-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-400 flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              Leaderboard
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="max-h-64 overflow-y-auto">
              {getFormattedLeaderboard().length > 0 ? (
                <div className="space-y-2">
                  {getFormattedLeaderboard().map((entry) => (
                    <div 
                      key={entry.id}
                      className={`flex justify-between items-center p-2 rounded ${
                        entry.isRecent ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`font-bold w-6 text-center ${
                          entry.rank === 1 ? 'text-yellow-400' :
                          entry.rank === 2 ? 'text-gray-300' :
                          entry.rank === 3 ? 'text-orange-400' :
                          'text-gray-400'
                        }`}>
                          #{entry.rank}
                        </span>
                        <span className="text-white">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold">{entry.score}</div>
                        <div className="text-xs text-gray-400">{entry.dateFormatted}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No scores yet!</p>
                  <p className="text-sm">Play a game to set your first record.</p>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Games Played</div>
                  <div className="text-white font-bold">{getStats().totalGames}</div>
                </div>
                <div>
                  <div className="text-gray-400">Best Score</div>
                  <div className="text-yellow-400 font-bold">{getStats().highestScore}</div>
                </div>
                <div>
                  <div className="text-gray-400">Average Score</div>
                  <div className="text-blue-400 font-bold">{getStats().averageScore}</div>
                </div>
                <div>
                  <div className="text-gray-400">Recent Score</div>
                  <div className="text-green-400 font-bold">{getStats().mostRecentScore}</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
