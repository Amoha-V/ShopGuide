
# ShopGuide

**Your inclusive shopping companion powered by AR, voice guidance, and smart recipes. Making shopping accessible and intelligent for everyone.**

 **Live Demo**: [https://shop-guide.netlify.app/](https://shop-guide.netlify.app/)  


## Overview

ShopGuide is an innovative shopping application designed with accessibility and intelligence at its core. By combining augmented reality (AR), voice guidance, and smart recipe integration, ShopGuide creates an inclusive shopping experience that empowers users of all abilities to shop confidently and efficiently.

##  Key Features

### Accessibility-First Design
- **Voice Guidance**: Navigate and interact with the app using voice commands
- **Screen Reader Compatibility**: Full support for assistive technologies
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Large Text Options**: Customizable text sizes for better readability

###  Augmented Reality Shopping
- **AR Product Visualization**: See how products look in your space before buying
- **Virtual Try-On**: Experience products through immersive AR technology
- **Smart Product Recognition**: Point your camera at items for instant information
- **Spatial Shopping**: Navigate stores with AR-powered directions

### Smart Recipe Integration
- **Recipe-Based Shopping Lists**: Generate shopping lists from your favorite recipes
- **Nutritional Insights**: Get detailed nutritional information for recipe ingredients
- **Dietary Accommodations**: Filter recipes and products based on dietary restrictions
- **Meal Planning**: Plan your meals and automatically create shopping lists

### Intelligent Shopping Assistant
- **Smart Recommendations**: AI-powered product suggestions based on your preferences
- **Price Comparison**: Compare prices across multiple retailers
- **Inventory Tracking**: Keep track of your pantry and household items
- **Shopping History**: Review past purchases and reorder favorites

##  Technology Stack

- **Frontend**: React.js with modern JavaScript (ES6+)
- **AR Framework**: WebXR / AR.js for augmented reality features
- **Voice Recognition**: Web Speech API for voice commands
- **Accessibility**: ARIA standards and WCAG 2.1 compliance
- **Styling**: CSS3 with accessibility-focused design system
- **Hosting**: Netlify with continuous deployment
- **Build Tools**: Webpack, Babel for modern JavaScript compilation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern browser with WebXR support (Chrome, Edge, Firefox)
- Camera and microphone permissions for AR and voice features

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Amoha-V/ShopGuide.git
cd ShopGuide
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Start the development server**:
```bash
npm start
# or
yarn start
```

4. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`
   - Allow camera and microphone permissions when prompted
   - Enable location services for store navigation features

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized build in the `build` folder with:
- Compressed assets for faster loading
- Service worker for offline functionality
- Optimized AR and voice recognition modules

## Usage Guide

### Getting Started with Voice Commands
1. Click the microphone icon or say "Hey ShopGuide"
2. Try commands like:
   - "Show me recipes for dinner"
   - "Find organic vegetables"
   - "Add milk to my shopping list"
   - "Compare prices for this item"

### Using AR Features
1. Allow camera access when prompted
2. Point your camera at products for instant information
3. Use AR mode to visualize products in your space
4. Follow AR directions for in-store navigation

### Creating Recipe-Based Shopping Lists
1. Browse the recipe section or search for specific dishes
2. Select a recipe you'd like to make
3. Click "Add to Shopping List" to automatically generate ingredients list
4. Modify quantities and add additional items as needed

##  Project Structure

```
ShopGuide/
├── public/
│   ├── index.html
│   ├── manifest.json          # PWA configuration
│   └── icons/                 # App icons for different devices
├── src/
│   ├── components/
│   │   ├── AR/               # Augmented reality components
│   │   ├── Voice/            # Voice recognition components
│   │   ├── Recipe/           # Recipe-related components
│   │   ├── Accessibility/    # Accessibility utilities
│   │   ├── Shopping/         # Shopping list and cart components
│   │   └── Common/           # Shared UI components
│   ├── services/
│   │   ├── arService.js      # AR functionality
│   │   ├── voiceService.js   # Voice recognition service
│   │   ├── recipeAPI.js      # Recipe data integration
│   │   └── accessibilityService.js
│   ├── hooks/
│   │   ├── useVoiceCommands.js
│   │   ├── useAR.js
│   │   └── useAccessibility.js
│   ├── styles/
│   │   ├── accessibility.css  # Accessibility-focused styles
│   │   ├── components.css
│   │   └── themes.css        # Light/dark/high-contrast themes
│   ├── utils/
│   │   ├── accessibility.js
│   │   ├── voiceCommands.js
│   │   └── arUtils.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```



##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Accessibility Community**: For guidance on inclusive design principles
- **AR.js Contributors**: For open-source AR framework
- **Voice Recognition Community**: For Web Speech API implementations
- **Recipe API Providers**: For nutritional and recipe data
- **Beta Testers**: Especially users with disabilities who provided valuable feedback

**Making shopping accessible and intelligent for everyone** 🛒
