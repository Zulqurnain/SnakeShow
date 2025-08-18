import { useState, useEffect, useCallback } from 'react';

const LEADERBOARD_KEY = 'snake-show-leaderboard';
const MAX_ENTRIES = 10;

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
    if (savedLeaderboard) {
      try {
        setLeaderboard(JSON.parse(savedLeaderboard));
      } catch (error) {
        console.error('Failed to parse leaderboard from localStorage:', error);
        setLeaderboard([]);
      }
    }
  }, []);

  // Save leaderboard to localStorage
  const saveLeaderboard = useCallback((newLeaderboard) => {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newLeaderboard));
      setLeaderboard(newLeaderboard);
    } catch (error) {
      console.error('Failed to save leaderboard to localStorage:', error);
    }
  }, []);

  // Add new score to leaderboard
  const addScore = useCallback((score, playerName = 'Anonymous') => {
    const newEntry = {
      id: Date.now() + Math.random(), // Simple unique ID
      name: playerName.trim() || 'Anonymous',
      score,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    setLeaderboard(currentLeaderboard => {
      // Add new entry and sort by score (descending)
      const updatedLeaderboard = [...currentLeaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_ENTRIES); // Keep only top entries

      // Save to localStorage
      try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
      } catch (error) {
        console.error('Failed to save leaderboard to localStorage:', error);
      }

      return updatedLeaderboard;
    });

    return newEntry;
  }, []);

  // Check if score qualifies for leaderboard
  const isHighScore = useCallback((score) => {
    if (leaderboard.length < MAX_ENTRIES) {
      return true;
    }
    
    const lowestScore = leaderboard[leaderboard.length - 1]?.score || 0;
    return score > lowestScore;
  }, [leaderboard]);

  // Get rank for a given score
  const getRank = useCallback((score) => {
    const rank = leaderboard.findIndex(entry => score > entry.score);
    return rank === -1 ? leaderboard.length + 1 : rank + 1;
  }, [leaderboard]);

  // Clear leaderboard
  const clearLeaderboard = useCallback(() => {
    localStorage.removeItem(LEADERBOARD_KEY);
    setLeaderboard([]);
  }, []);

  // Get formatted leaderboard for display
  const getFormattedLeaderboard = useCallback(() => {
    return leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      dateFormatted: new Date(entry.date).toLocaleDateString(),
      isRecent: Date.now() - entry.timestamp < 60000 // Less than 1 minute ago
    }));
  }, [leaderboard]);

  // Get statistics
  const getStats = useCallback(() => {
    if (leaderboard.length === 0) {
      return {
        totalGames: 0,
        highestScore: 0,
        averageScore: 0,
        mostRecentScore: 0
      };
    }

    const scores = leaderboard.map(entry => entry.score);
    const total = scores.reduce((sum, score) => sum + score, 0);
    
    return {
      totalGames: leaderboard.length,
      highestScore: Math.max(...scores),
      averageScore: Math.round(total / leaderboard.length),
      mostRecentScore: leaderboard.find(entry => 
        entry.timestamp === Math.max(...leaderboard.map(e => e.timestamp))
      )?.score || 0
    };
  }, [leaderboard]);

  return {
    leaderboard,
    addScore,
    isHighScore,
    getRank,
    clearLeaderboard,
    getFormattedLeaderboard,
    getStats,
    saveLeaderboard
  };
};
