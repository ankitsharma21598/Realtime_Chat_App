# Realtime Chat App

This is a simple realtime chat application built with React, Chakra UI, and Firebase. Users can sign in with Google authentication and exchange messages in real-time.

## Features

- User authentication using Google Sign-In.
- Real-time message updates.
- Messages are displayed in a chat interface.
- Smooth scrolling to the bottom of the message list.
- Responsive design.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Chakra UI: Component library for React applications.
- Firebase: Backend as a Service (BaaS) platform by Google for authentication and real-time database.

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/your-username/realtime-chat-app.git
```

2. Install dependencies:

```
cd realtime-chat-app
npm install
```

3. Set up Firebase:

    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Google authentication in the Firebase project settings.
    - Create a Firestore database in test mode.
    - Copy the Firebase configuration object from your project settings and replace it in the `firebase.js` file.

4. Start the development server:

```
npm start
```

5. Open the app in your browser:

```
http://localhost:3000
```

## Folder Structure

- `src/`: Contains the source code files.
  - `Component/`: Contains reusable components.
  - `firebase.js`: Firebase configuration and initialization.
  - `App.js`: Main component containing the chat application logic.

