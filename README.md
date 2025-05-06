# Online Tutor Recommendation Component with Groq AI (Next.js App Router)

## Overview

This project demonstrates a single Next.js component that allows users to input their learning needs and receive online tutor recommendations powered by Groq AI. It leverages the Next.js App Router for building the UI and API endpoint, CSS Modules for styling, and the Groq AI SDK for interacting with the language model.

## Key Features

* **Single Input Component:** A user-friendly interface for entering learning requirements.
* **Dynamic Recommendations:** Displays a list of tutors with their name, subject, experience, and rating based on the user's input.

## Technologies Used

* **Next.js:** Version 14+ (App Router)
* **React (TypeScript):** For building the component.
* **CSS Modules:** For component-scoped styling.
* **Groq AI SDK:** To interact with the Groq language model.

## Prerequisites

* **Next.js:** Version 18.17 or later.
* **npm** or **yarn:** Package managers.
* **Groq API Key:** Required to access the Groq AI service. Sign up at [https://console.groq.com/](https://console.groq.com/).

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd your-repository-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # Or with yarn:
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Groq API key:

    ```
    GROQ_API_KEY=YOUR_ACTUAL_GROQ_API_KEY
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # Or with yarn:
    yarn dev
    ```

    Open your browser and navigate to `http://localhost:3000`.

