# TermExec

![Demo of TermExec](terminal2.gif)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

## Introduction
**TermExec** is a lightweight and secure web-based terminal application that allows users to execute Python code in real time. Built with a frontend powered by **Xterm.js** and a backend using **WebSocket** and **Docker**, TermExec provides an isolated and dynamic environment for code execution.

---

## Prerequisites
To set up and run TermExec, ensure the following prerequisites are installed on your machine:

1. **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
2. **Docker** - [Install Docker](https://www.docker.com/)
3. A modern browser to access the frontend.

---

## Installation

### 1. Frontend Installation
The frontend is located in the `front` directory and is built using **Xterm.js** for terminal functionality.

#### Steps:
1. Navigate to the `front` directory:
   ```bash
   cd front
2. Install the necessary dependencies:
   ```bash
   npm install
### 2. Backend Installation
The backend is located in the `server` directory and is responsible for managing WebSocket connections and securely executing Python code inside Docker containers.

#### Steps:
1. Navigate to the `server` directory:
   ```bash
   cd server
2. Install the necessary dependencies:
   ```bash
   npm install

#### How to Run

1. In the server directory, run 
  ```bash
  node server.js

2. In the frontend directory, run
  ```bash
  npx serve .

3. Now write the python command in the terminal