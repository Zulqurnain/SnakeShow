# 🐍 SnakeShow - The Most Colorful Snake Game Ever!

A modern, animated Snake game built with React, featuring rainbow snake colors, animated grocery food items, lava walls, and cross-platform support for web and mobile.

## ✨ Features

- 🌈 **Rainbow Snake**: Snake changes colors based on the food it eats
- 🍎 **Grocery Food Items**: Random animated SVG food items (apples, bananas, oranges, grapes)
- 🔥 **Animated Lava Walls**: Deadly animated walls with fire and lava effects
- 📱 **Cross-Platform**: Runs in web browsers and compiles to iOS/Android apps
- 🎮 **Modern Controls**: Keyboard (WASD/Arrows), touch controls, and swipe gestures
- 🏆 **Leaderboard System**: Local storage-based high score tracking
- ⚡ **Smooth Animations**: CSS animations and SVG effects
- 📊 **Game Statistics**: Track games played, best scores, and averages
- 🎯 **Progressive Difficulty**: Game speed increases as you eat more food

## 🎮 How to Play

### Controls
- **Desktop**: Use WASD keys or Arrow keys to move
- **Mobile**: Swipe in the direction you want to move or use on-screen buttons
- **Pause**: Press Space bar or click the pause button

### Gameplay
1. Control the snake to eat food items
2. Each food item makes the snake longer and changes its color
3. Avoid hitting walls (animated lava/fire) or yourself
4. Try to achieve the highest score possible!
5. Speed increases as you eat more food

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Web Development

```bash
# Clone the repository
git clone https://github.com/your-username/SnakeShow.git
cd SnakeShow

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Mobile App Development

```bash
# Build and sync for mobile
npm run build:mobile

# Open in Android Studio (requires Android Studio)
npm run open:android

# Open in Xcode (requires Xcode on macOS)
npm run open:ios

# Run on connected Android device
npm run run:android

# Run on iOS simulator/device (macOS only)
npm run run:ios
```

## 📱 Mobile App Requirements

### Android
- Android Studio 4.0+
- Android SDK 21+
- JDK 11+

### iOS (macOS only)
- Xcode 12+
- iOS 13+
- Xcode command line tools

## 🎨 Technical Features

### Built With
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Capacitor** - Cross-platform mobile app development
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives

### Architecture
- **Custom Hooks**: `useGameLogic` and `useLeaderboard` for state management
- **SVG Animations**: Custom animated components for snake, food, and walls
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Persistent leaderboard and statistics
- **Touch Gestures**: Native mobile swipe controls

### Performance Optimizations
- Smooth 60fps game loop
- Efficient collision detection
- Optimized rendering with React.memo where needed
- Minimal re-renders using useCallback and useMemo

## 🎮 Game Components

### Snake System
- **Transparent Base**: Snake segments have adjustable opacity
- **Rainbow Colors**: Each segment can display different colors
- **Head Animation**: Special glow effect on snake head
- **Smooth Movement**: Animated transitions between positions

### Food System
- **Random Types**: Apple, banana, orange, grape with unique SVG designs
- **Animated Items**: Pulsing and scaling animations
- **Color Influence**: Food type affects snake segment colors
- **Smart Placement**: Ensures food never spawns on snake

### Wall System
- **Lava Walls**: Animated flowing lava with bubble effects
- **Fire Walls**: Dancing flame animations
- **Deadly Touch**: Instant game over on contact
- **Visual Feedback**: Glowing and brightness effects

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Web Browser Support | Complete | Runs in any modern browser |
| ✅ Mobile App (Android) | Complete | APK compilation ready |
| ✅ Mobile App (iOS) | Complete | iOS app compilation ready* |
| ✅ Animated Graphics | Complete | SVG-based animations throughout |
| ✅ Touch Controls | Complete | Swipe gestures and button controls |
| ✅ Leaderboard | Complete | Local high score tracking |
| ✅ Sound Ready | Complete | Architecture ready for sound integration |
| ✅ Responsive UI | Complete | Works on all screen sizes |

*iOS compilation requires Xcode on macOS

## 🎯 Game Mechanics

### Scoring System
- **10 points** per food item eaten
- **Progressive Speed**: Game gets faster as score increases
- **Length Bonus**: Snake length displayed alongside score

### Color System
The snake changes colors based on food consumed:
- 🍎 **Red foods** → Red-tinted segments
- 🍌 **Yellow foods** → Yellow-tinted segments  
- 🍊 **Orange foods** → Orange-tinted segments
- 🍇 **Purple foods** → Purple-tinted segments

### Difficulty Progression
- Initial speed: 150ms per move
- Speed increases by 2ms per food eaten
- Maximum speed: 80ms per move
- Walls become more dangerous as speed increases

## 🚀 Deployment

### Web Deployment
The app builds to static files and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Mobile App Distribution
- **Android**: Build APK through Android Studio
- **iOS**: Build IPA through Xcode (macOS required)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 Screenshots & Demo

Visit the live demo at: [https://github.com/Zulqurnain/SnakeShow](https://github.com/Zulqurnain/SnakeShow)

## 🐛 Known Issues & Roadmap

### Known Issues
- iOS build requires Xcode (limitation of development environment)
- Some older browsers may not support all CSS animations

### Future Enhancements
- 🔊 Sound effects and background music
- 🌐 Online multiplayer mode
- 🎖️ Achievement system
- 🎨 Customizable themes
- 📱 PWA (Progressive Web App) support
- 🎯 Power-ups and special items

## 💝 Acknowledgments

- Inspired by the classic Snake game
- SVG animations inspired by modern web design trends
- Built with modern React patterns and best practices

---

**Built by [Zulqurnain Haider](https://zulqurnainj.com/) — Senior Full Stack Engineer**

For full portfolio visit: [https://zulqurnainj.com/](https://zulqurnainj.com/)

*Game tested on Chrome, Firefox, Safari, and mobile browsers*
