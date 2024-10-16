# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
Guidance to start the front-end server
1. First, make sure you have npm and Node.js installed on your computer.
2. Second, navigate to the file path in the terminal and type `npm start` to install the npm modules.
3. Third, type `npm run dev` in the terminal. If there are any missing packages, install them as prompted.

Front-end structure
/project-root
/
├── /certs                  # SSL certificates for local HTTPS development
│
├── /node_modules           # Node.js modules 
│
├── /public                 # Public assets 
│
├── /src                    # Main source folder
│   ├── /assets             # Static assets like images, icons, etc.
│   ├── /components         # Reusable components
│   │   ├── BackButton      # BackButton component
│   │   ├── NavBar          # Navigation bar component
│   │   └── SGTitle         # Title component for branding
│   ├── /pages              # Individual pages of the app
│   │   ├── DrinkingPlan    # Drinking Plan page
│   │   ├── HealthTips      # Health Tips page
│   │   ├── Home            # Home page
│   │   ├── LoginPage       # Login page
│   │   ├── Map             # Map page
│   │   ├── MyInfo          # User Info page
│   │   ├── PersonalProfile # Personal profile page
│   │   ├── Register        # User registration page
│   │   ├── Reset           # Password reset page
│   │   ├── RewardsPage     # Rewards page
│   │   ├── TimeRecord      # Time tracking records page
│   │   └── UserInterests   # User Interests page
│   ├── /styles             # Global and component styles
│   │   ├── global.css      # Global CSS file for common styles
│   │
│   ├── App.tsx             # Main App component
│   ├── index.css           # Global stylesheet for index page
│   ├── main.tsx            # Main entry point for the app
│   └── vite-env.d.ts       # TypeScript environment declaration
│
├── .gitignore              # Git ignore file
├── eslint.config.js        # ESLint configuration file
├── index.html              # Main HTML file
├── package-lock.json       # Dependency lock file
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # Main TypeScript configuration file
├── tsconfig.node.json      # TypeScript configuration for Node.js
└── vite.config.ts          # Vite configuration file

Justification of front-end files
1.Src/Components/backbutton
For the `BackButton` component, the implementation choices are explained as follows:

- **Why a BackButton?**: The `BackButton` enhances navigation within the app, allowing users to return to the previous page intuitively, which is essential for improving the overall mobile app user experience.

- **Implementation**: The component leverages React Router's `useNavigate` for backward navigation and uses Material-UI's `IconButton` for consistency with the app’s design. The button is styled with CSS modules to scope the styles locally, ensuring no conflicts with other elements.

- **Mocking**: By mocking the button functionality with `navigate(-1)`, it demonstrates how users can navigate back without needing a fully integrated routing system. This allows you to test backward navigation early in development.

- **Design**: The design features a simple and recognizable back arrow icon (`ArrowBackIosIcon`), with a tooltip to indicate its function. The use of Material-UI ensures a responsive and visually cohesive button that fits within the app’s theme.

2.Src/Components/Navbar
For the `NavBar` component, the implementation choices are justified as follows:

- **Why a NavBar?**: A navigation bar is a critical part of a mobile app’s user interface, providing quick access to various pages. The `NavBar.tsx` offers a flexible, collapsible sidebar menu that enhances usability and navigation efficiency.

- **Implementation**: The component uses Material-UI for consistent design and a list of navigation items, each with a defined path and icon for visual clarity. The state (`isNavOpen`) manages the toggling behavior of the menu, while `useNavigate` ensures smooth page transitions. Additionally, the shake animation adds a visually appealing touch when interacting with the nav button.

- **Mocking**: The mockup includes basic navigation without full routing integration. This allows you to test how the user interacts with the `NavBar` and transitions between different sections of the app before final routing setup.

- **Design**: The `NavBar` has a clean and visually appealing design, with a collapsible menu for better use of screen space. Icons and hover effects improve user engagement, while the `WidgetsIcon` and `WidgetsOutlinedIcon` toggle provide an intuitive interaction for opening and closing the navigation. The shake animation adds a playful element to enhance the user experience.

3.Src/Components/SGTitle
For the `SGTitle` component, the implementation choices are justified as follows:

- **Why a Title Component?**: The `SGTitle` component centralizes the app's branding, ensuring consistent use of the title across pages. It serves as a clickable logo or heading that improves navigation and reinforces the app's identity.

- **Implementation**: This component utilizes Material-UI's `Typography` for easy styling and React Router’s `Link` for navigation. The `variant` prop allows flexibility in rendering different heading levels, while the `to` prop provides dynamic link destinations. This makes it versatile and reusable across different pages.

- **Mocking**: The mockup provides basic functionality—clicking on the title navigates to the homepage or any provided route. This allows testing of navigation flow early in development without requiring full routing integration.

- **Design**: The large, bold, and visually distinct title with a custom font (`Papyrus, fantasy`) and teal color (`#2ED2B9`) aligns with the app's design theme. It ensures the title stands out and is easily recognizable as the central branding element.

4.Src/Pages/HealthTips
For the `HealthTips` component, the implementation choices are justified as follows:

- **Why a Health Tips Page?**: The `HealthTipsPage` offers users valuable advice on reducing alcohol intake, centralizing health tips in a dedicated section for better user engagement.

- **Implementation**: Using Material-UI’s `Box` for layout and `TextField` for search functionality, this component dynamically renders tips from `healthTipsData.ts` using the `TipCard` component. The modular design ensures easy updates and scalability.

- **Mocking**: The current setup allows for basic navigation and tip display, with the search bar as a placeholder for future functionality.

- **Design**: The clean, responsive layout, with a dark background (`#01344A`) and adequate spacing, makes the tips visually appealing and easy to navigate, enhancing the user experience.

5.Src/pages/MyInfo
For the `Myinfo` component, the implementation choices are justified as follows:

- **Why a User Information Page?**: The `MyInfo` component allows users to manage personal details like age, height, weight, gender, and alcohol tolerance, enhancing the app's personalization and helping users track health-related data.

- **Implementation**: This component uses Material-UI’s `Box` for layout and `Button` for navigation, with React’s `useState` and `useEffect` managing user data via `localStorage`. The `InfoCard` component is used for displaying and updating individual fields, ensuring modularity and reusability. React Router's `useNavigate` enables easy navigation to the personal profile page.

- **Mocking**: The current setup allows for testing updates and navigation without a backend. Data is stored in `localStorage`, simulating persistence and ensuring a smooth user experience across sessions.

- **Design**: The layout uses bold colors (`#024` background, green and blue highlights) and icons for each field to create a clean, visually appealing design. The responsive layout ensures the page looks good across devices, aligning with the app's overall design language.

6.Src/pages/PersonalProfile
For the `PersonalProfile` component, the implementation choices are justified as follows:

- **Why a Personal Profile Page?**: The `PersonalProfile` component allows users to manage their personal details, such as name, age, gender, email, and phone. It offers users a personalized experience, enabling them to edit and save their profile information.

- **Implementation**: The component uses `useState` for profile data and `useEffect` to retrieve stored profile information from `localStorage`. Material-UI’s `Grid`, `TextField`, and `Avatar` components are used to structure the profile and manage user input, while the `Button` toggles between edit and save modes.

- **Mocking**: The component supports basic functionality with local storage, simulating profile updates without needing a backend. It allows testing of the edit and save flow with persistent data across sessions.

- **Design**: The layout features a clean, centered design with a dark background (`#024`) and green highlights (`#26a69a`). The responsive form, bold typography, and prominent avatar make the profile visually appealing and easy to interact with.

7.Src/pages/UserInterst
For the `UserInterst` component, the implementation choices are justified as follows:

- **Why a User Interests Page?**: The `UserInterests` component lets users select personal interests, helping the app personalize content and enhance user engagement by tailoring recommendations.

- **Implementation**: It uses `useState` for managing selected interests and `useEffect` for persisting these choices in `localStorage`. Material-UI components like `Button` and `Grid` are used to render a selectable grid of interests. A `Snackbar` provides feedback after confirmation.

- **Mocking**: This component simulates a personalized user experience by allowing selection and saving of interests, with no backend needed. The confirmation flow is functional for testing purposes.

- **Design**: The page features a clean, responsive design with a dark background (`#024`) and green highlights for selected interests, ensuring a smooth user interaction and visually appealing layout.


8.Src/Pages/LoginPage
For the `LoginPage` component, the implementation choices can be explained as follows:

- **Why a Login Page?**: A `LoginPage` is crucial for user authentication, enabling secure access to personalized features and ensuring data privacy within the app.

- **Implementation**: The `LoginPage.tsx` includes user input fields for username and password, along with submit handling logic. The use of Material-UI components (like `Button`) ensures a polished and responsive design. Icons for external login options provide alternative login methods, enhancing accessibility.

- **Mocking**: The login logic is currently mocked (e.g., `console.log` for login attempts) to simulate login functionality without backend integration. This allows testing of UI interaction and behavior flow before full authentication implementation.

- **Design**: The page uses a visually appealing background image and clear, accessible input fields. The consistent use of colors and typography ensures alignment with the app’s theme, while the inclusion of external login options (Apple, Google, Email) offers flexibility and enhances the user experience.

9.Src/Pages/Map
For the `Map` component, the implementation choices are justified as follows:

- **Why a Map Component?**: The `Map.tsx` is essential to visualize geographic data, aligning with the app’s core functionality of tracking locations and providing users with real-time visual data. It enhances user interaction by allowing them to view their location and nearby places.

- **Implementation**: The component utilizes Google Maps and Places APIs to display user location, search for places, and recommend activities. It also incorporates a timer to track time spent at a location, offering a personalized experience. State management and effect hooks ensure the component is dynamic and interactive.

- **Mocking**: Mocking this component with hardcoded functionality (like a countdown timer or input fields) allows you to simulate real-world scenarios without requiring a backend or fully integrated API. This helps in testing UI flows early in the development process.

- **Design**: The design offers intuitive interaction, with simple input fields, location detection, and user-friendly controls (buttons and text inputs). It allows for real-time feedback (like notifications and timers), which keeps the user engaged and informed about their location or task progress.

10.Src/Pages/MyInfo
(Andy wang)

11.Src/Pages/Register
For the `RegisterPage` component, the implementation choices are explained as follows:

- **Why a Register Page?**: The `RegisterPage` is crucial for user onboarding, allowing new users to create an account and access the app’s personalized features. It ensures user authentication and adherence to the app's terms.

- **Implementation**: The component uses form state management for user input (first name, last name, email, etc.) and Material-UI for styled buttons. It also includes form validation logic (e.g., sending verification codes and ensuring passwords match). The `useNavigate` hook handles navigation, allowing users to return to the login page if needed.

- **Mocking**: Form submission and sending the verification code are mocked for demonstration purposes, enabling UI testing without backend integration. This lets you simulate the user registration process early on.

- **Design**: The design focuses on user-friendliness with a clean layout, intuitive input fields, and clear calls to action (e.g., "Send" and "Create" buttons). The use of icons (`FaArrowLeft`, `FaPaperPlane`, `FaCheck`) adds visual cues to improve the user experience, making the registration process more engaging.

12.Src/Pages/Reset
For the `Reset` component, the implementation choices are as follows:

- **Why a Reset Password Page?**: The `Reset` page is crucial for users to recover their accounts by resetting their passwords. This ensures security and user convenience, allowing users to regain access to their accounts when they forget their credentials.

- **Implementation**: The component uses state management for user inputs (identifier, verification code, and new password). It includes buttons to send a verification code and submit the reset form. Material-UI’s `Button` component is used to create consistent and responsive buttons, while `useNavigate` enables smooth transitions between pages.

- **Mocking**: The password reset logic and verification code sending are mocked, enabling early testing of the user interface and form behavior without requiring backend integration.

- **Design**: The design includes a clean form layout with intuitive input fields, focusing on user experience and simplicity. The use of icons (`FaArrowLeft`, `FaPaperPlane`, `FaCheck`) makes the interface more interactive and visually appealing. The "Create a new account" button provides a clear alternative action for users who might not have an account.

13.Src/Pages/RewardsPage
For the `RewardsDashboard` component, the implementation choices are as follows:

- **Why a Rewards Dashboard?**: This component adds a motivational element by rewarding users for maintaining healthy behavior, such as reducing alcohol consumption. It engages users and provides a positive reinforcement mechanism, enhancing the app's overall value and user retention.

- **Implementation**: The component uses a `LineChart` to visually represent users' weekly alcohol intake, providing an easy-to-understand progress tracker. The reward system is implemented using state management to control the dashboard’s interactive elements (e.g., opening the reward box and showing the selected reward). A modal with a smooth transition (using Material-UI's `Modal` and `Fade`) displays the reward, adding a satisfying user experience.

- **Mocking**: The reward selection is mocked by randomizing the reward with no back-end interaction. This allows for early testing of the reward process flow without needing real data or integration, ensuring that the user experience can be demonstrated and refined.

- **Design**: The design focuses on user engagement with visually appealing elements like the reward box and progress chart. Bright colors like `#4CAF50` for success feedback and `#8884d8` for chart lines are used to maintain a playful and engaging feel. The use of animations and transitions enhances the overall user experience, making the reward process exciting and interactive.

14.Src/Pages/TimeRecord
For the `TimeTrackingRecord` component, the implementation choices are as follows:

- **Why a Time Tracking Record?**: This component allows users to view and track their time spent at various locations, providing valuable insights into their habits and behaviors. It adds a useful historical record of their activities.

- **Implementation**: The component manages pagination to handle larger datasets effectively, showing a list of time tracking records (location, date, duration) with clear visual separation. `useState` handles page changes, and Material-UI components like `List`, `Pagination`, and `Typography` ensure a consistent and responsive design. The use of `AccessTimeIcon` adds a visual cue for each entry.

- **Mocking**: The time tracking data is mocked, simulating real user activity to demonstrate the component’s functionality. This allows for early-stage UI testing without requiring actual data integration.

- **Design**: The design is clean and organized, with a dark theme and accent colors like `#4FFBDF` for highlighting important details. Pagination is fixed at the bottom for easy navigation, enhancing the user experience while keeping the layout visually appealing and functional.

15.Src/styles/global.css
For the CSS you shared, the implementation choices are as follows:

- **Why this Mobile-First Layout?**: This layout is designed specifically for mobile devices, providing a consistent user experience on smaller screens. With a fixed width (`max-width: 414px`) and height (`max-height: 896px`), the app mimics common mobile resolutions, ensuring it looks and functions as intended on devices like iPhones.

- **Implementation**: The `#mobile-view` container sets the foundation for the mobile view, while the `.App` class ensures that the app content fills the available space. The layout uses Flexbox for vertical arrangement and easy handling of content inside the app. The `.header` is fixed at the top, while the `.content` section scrolls when content overflows.

- **Mocking**: The layout is responsive and mocks the structure for different mobile screen sizes using media queries. It simulates mobile behavior in a browser to allow for testing the UI flow on different devices.

- **Design**: The dark theme (`background-color: #01344A`) combined with minimal spacing provides a modern, clean look. The CSS aims to maintain simplicity while focusing on mobile responsiveness, ensuring the app is visually consistent and usable across different device resolutions.

16.Src/app.tsx
For the `App` component, the implementation choices are explained as follows:

- **Why React Router?**: React Router is used to handle navigation within the app, allowing users to switch between pages (e.g., HomePage, GoogleMaps, LoginPage) without reloading the entire app. It provides a seamless and intuitive user experience.

- **Implementation**: The app is structured with routes for key pages such as Home, Map, Login, Register, Rewards, and others. A consistent layout is maintained with the `SGTitle`, `BackButton`, and `NavBar` components displayed across all pages. The `GoogleMaps` component takes an `apiKey` prop, ensuring map functionality is embedded correctly.

- **Mocking**: The routes are set up to simulate the app’s navigation behavior without the need for backend integration. This allows the development of UI and UX flows while testing interactions between different pages.

- **Design**: The layout is optimized for mobile devices, as defined by the `#mobile-view` container. The fixed header includes essential elements like the title, back button, and navigation bar, while the content area dynamically updates based on the current route. This ensures a responsive and smooth user experience across different sections of the app.

17.Src/index
For the provided CSS, the implementation choices can be explained as follows:

- **Why Root Styles?**: The `:root` selector sets base styles like font family, color scheme, and font smoothing across the entire app. These global styles ensure consistency and improve readability and performance (e.g., with `font-smoothing` and `optimizeLegibility`).

- **Implementation**: The styles define a modern look with the `Inter` font as the default, a color scheme toggle between light and dark modes, and a clear, responsive design using `flex` layout for centering content. Buttons are styled with transitions for hover effects, providing a smooth user interaction.

- **Mocking**: The use of variables and media queries (like `prefers-color-scheme`) allows testing both light and dark themes without full backend or system-level integration, making the design adaptive to user preferences.

- **Design**: The minimalist design uses a dark background with light text (`rgba(255, 255, 255, 0.87)`) for readability in dark mode, while in light mode, text switches to a darker color (`#213547`) with a white background. Interactive elements like links and buttons are styled with transitions to enhance user experience, ensuring visual feedback on hover and focus. This combination makes the design both modern and user-friendly across devices.

18.Vite.config.ts
For the Vite configuration, the implementation choices are as follows:

- **Why HTTPS Configuration?**: This configuration sets up a secure local development environment using HTTPS with SSL certificates (`localhost-key.pem` and `localhost.pem`). HTTPS is often required for testing features like service workers or APIs that require secure connections, ensuring your development environment mimics production scenarios.

- **Implementation**: The `fs` and `path` modules are used to read the certificate files from a local `certs` directory. The server is configured to run on port `5173` with `host: '0.0.0.0'`, allowing it to be accessible from other devices on the local network. This is useful for testing the app across multiple devices or browsers in your network.

- **Mocking**: The use of local SSL certificates mocks the production security settings during development. This enables testing HTTPS-restricted features without needing a public SSL certificate.

- **Design**: The configuration ensures a smooth and secure development experience while enabling cross-device testing via the local network. By using a standard port and configuring SSL, you ensure that your development environment closely aligns with production requirements, improving reliability when deploying the final app.
