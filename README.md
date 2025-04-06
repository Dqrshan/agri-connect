# AgriConnect

## Connecting Farmers and Buyers through Technology

AgriConnect is a mobile application designed to bridge the gap between agricultural producers and buyers. The app provides market insights, crop management tools, and direct transaction capabilities in a simple, accessible interface optimized for smartphones.

## 🌾 Features

### For Farmers
- **Market Insights:** Real-time data on top-selling vegetables and price trends
- **Crop Management:** Track planting, irrigation, and fertilizer application
- **AI Crop Analysis:** Scan crops with your camera to receive health reports
- **Transaction History:** View and manage all buyer interactions
- **Personalized Updates:** Receive timely recommendations for irrigation, harvesting, and market conditions

### For Buyers
- **Discover Local Produce:** Find farmers in your area and their available crops
- **Market Trends:** Stay updated on price fluctuations and availability
- **Agricultural News:** AI-generated updates relevant to your interests
- **Transaction Management:** Track all purchases and interactions with farmers
- **Preference-Based Recommendations:** Receive alerts when preferred crops become available

## 📱 Mobile-First Design
AgriConnect is exclusively designed for mobile devices, providing a streamlined experience for users in the field or on the go.

## 🚀 Tech Stack

- **Stack:** React & Vite with TypeScript
- **Database:** Local Storage
- **AI Integration:** Google Gemini API
- **Authentication:** OTP-based phone verification
- **Visualization:** Chart.js for data visualization
- **Hosting:** Netlify

## 📋 Prerequisites

- Node.js 18.0.0 or later
- npm
- Gemini API key (free tier)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Dqrshan/agri-connect.git
cd agri-connect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your API keys and configuration.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) with your mobile device or using responsive design mode in your browser.

## 🙏 Acknowledgments

- Thanks to all the farmers and buyers who provided feedback during the design phase
- [Gemini API](https://ai.google.dev/) for providing AI capabilities
- [Netlify](https://netlify.app/) for hosting


---

Made with ❤️ for the agricultural community