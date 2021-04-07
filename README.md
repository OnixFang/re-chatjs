# Re-Chat.js

The app is currently at a beta stage, but has enough basic features developed to be used already!

Just hop in, enter any username you like, click login and start chatting! If anyone enters with you that is.

Link to live app: https://rechatjs.herokuapp.com/

# Screen shots

- Login page:
  ![Login page](https://i.imgur.com/tXH1tuol.png)

- Chat page:
  ![Chat page 1](https://i.imgur.com/EVJ9n1Pl.png)
  ![Chat page 2](https://i.imgur.com/9xuvUCml.png)
  ![Chat page 3](https://i.imgur.com/EK4n2aml.png)

# About

This project is purely being developed to test my react skills. Although there are a lot of tutorials to create a chat app with react and socket.io, I did not use one to create this app other than [socket.io](https://socket.io/get-started/chat)'s getting started (as a refresher for using socket.io) and looking at a few ways of how to use socket.io on react.

The app is named after my first big personal project, Chat.js. It was made with the same purpose: test my skills, but that time it was for AngularJs. It was made with Angularjs, Node with express, socket.io, Bootstrap and MySQL. The stack for this app is (and will be once completed) the MERN stack: MongoDb, Express, React and Node.js (along with socket.io of course. I did not use any css library for this because the UI was simple enough and I also like to keep my css skills being tested, specially positioning.

# Version 0.7.0b (current version)

The app is currently at version 0.7.0 beta. At this point, the app is just supplying the most basic features of a chat app and maybe less.

# Login page

The app will land on the login page but just ask for a username, no password, and here you can use whatever username you like, it will let you in and keep your user active in memory until you logout or close the page, no database involved, but two users can't use the same username.

# Chat page

This is the main page of the app. It is composed with the following components:

- ## Room List

  Displayed as a panel in the left (hidden in mobile with a menu button to draw it), which contains two other components:

  - **User info**: diplays the user's username and image. It also has a logout button which will remove your user from memory and take you back to the login page.
  - **Room list**: displays a list of the chat rooms in which the user is in. It currently shows two rooms: Live chat, Live chat 2. But selecting any of those will do nothing as room switching is yet to be implemented. Its purpose is to be a place holder for now.

- ## Active Chat

  The important part of the page and where the main action happens. It is composed by the following components:

  - **Room bar**: displayed as a bar at the top of the page. It displays the chat room's image and name, along with the participants (truncated if too many).

  - **Chat window**: this window is where the chat messages are displayed, each will be added from top to bottom and the window will scroll down as the messages arrive so that the latest message is visible. Each will be displayed on a certain position depending its transmitter:

    - Right: from you.
    - Left: from any other user.
    - Center: from server.

    Each message will display the username at the top and the date and time at the bottom of the message bubble.

  - **Chat input**: it is a band in the bottom with a text input and a send button for the user to send messages.

# Planned development

For the app to reach its complete first version (1.0), it will need to have the following:

- Redux
- Private chats
- MongoDb

Each of this will add up a 0.1 to the version and each might have their own set of milestones which can add a 0.0.1 to the version as it is developed. You can refer to the updates section on this document when the updates arrive!