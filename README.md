# ChatAppNextJs 💬

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-green.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Development-orange.svg?style=for-the-badge)

A powerful real-time chat application built with **Next.js 15**, **TypeScript**, and **Convex**. This application provides seamless real-time messaging, friend management, and group conversations with a modern, responsive user interface.

---

## 🌟 Key Features

- **💬 Real-Time Messaging**: Instant message delivery with live updates powered by Convex.
- **👥 Friend Management**: Add, manage, and maintain a friends list with request notifications.
- **👫 One-on-One Conversations**: Direct messaging with individual friends.
- **👨‍👩‍👧‍👦 Group Conversations**: Create and manage group chats with multiple participants.
- **🎨 Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components.
- **🔐 Authentication**: Secure user authentication and session management.
- **📱 Mobile Responsive**: Works seamlessly on desktop and mobile devices.
- **🌓 Theme Support**: Light and dark mode toggle for user preference.

---

## 🏗️ Project Structure

```bash
ChatAppNextJs/
├── 📂 src/
│   ├── 📂 app/               # Next.js App Router pages
│   │   ├── 📂 (root)/        # Main application routes
│   │   │   ├── 📂 conversations/    # Conversation management
│   │   │   ├── 📂 friends/          # Friend management
│   │   │   └── layout.tsx
│   │   ├── 📂 sign-in/       # Authentication pages
│   │   └── layout.tsx
│   ├── 📂 components/        # Reusable React components
│   │   ├── 📂 conversation/  # Conversation UI components
│   │   ├── 📂 sidebar/       # Navigation and sidebar
│   │   ├── 📂 ui/            # Base UI components (shadcn/ui)
│   │   └── 📂 items-list/    # List components
│   ├── 📂 hooks/             # Custom React hooks
│   ├── 📂 lib/               # Utility functions
│   ├── 📂 providers/         # Context and providers
│   ├── middleware.ts         # Next.js middleware
│   └── 📂 app/               # Global styles
├── 📂 convex/                # Backend logic (Convex)
│   ├── 📂 _generated/        # Auto-generated API files
│   ├── schema.ts             # Database schema
│   ├── user.ts               # User-related functions
│   ├── conversation.ts       # Conversation logic
│   ├── message.ts            # Message logic
│   ├── friend.ts             # Friend management logic
│   └── auth.config.ts        # Authentication config
├── 📄 package.json           # Dependencies and scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 tailwind.config.ts     # Tailwind CSS configuration
└── 📄 next.config.mjs        # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Convex** account (for backend services)
- **Authentication provider** (Clerk, Auth0, or similar)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/atharv0811/ChatAppNextJs.git
    cd ChatAppNextJs
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and configure:

    ```env
    NEXT_PUBLIC_CONVEX_URL=your_convex_url
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
    CLERK_SECRET_KEY=your_clerk_secret
    ```

4.  **Deploy Convex backend:**

    ```bash
    npx convex deploy
    ```

5.  **Running the Application:**

    ```bash
    npm run dev
    ```

    - **Frontend**: http://localhost:3000

---

## 🛠️ Technology Stack

| Frontend                                                                                                       | Backend                                                                                         | Tools & Services                                                                                           |
| :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)              | ![Convex](https://img.shields.io/badge/Convex-FF6B35?style=flat&logo=convex&logoColor=white)    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)   |
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)                     | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)                        |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | JavaScript/TypeScript                                                                           | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white) |
| shadcn/ui                                                                                                      | Real-time updates                                                                               | npm                                                                                                        |
| Radix UI                                                                                                       | WebSocket support                                                                               | Convex CLI                                                                                                 |

---

## 📖 Project Documentation

For more detailed information about specific parts of the project:

- **Frontend Components**: See [src/components](src/components) for UI component documentation
- **Backend Logic**: See [convex](convex/README.md) for Convex function documentation
- **Hooks**: See [src/hooks](src/hooks) for custom React hooks usage

---

## 🔄 Key Workflows

### Adding a New Feature

1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Implement backend logic in `convex/`
4. Connect frontend and backend via hooks in `src/hooks/`

### Real-Time Updates

The application uses Convex subscriptions for real-time messaging and notifications. Updates are automatically propagated to all connected clients.

---

## 📜 License

This project is licensed under the ISC License.

---

## 👤 Author

Built with ❤️ by [atharv0811](https://github.com/atharv0811)

## Live Demo

Vercel - https://chat-app-next-js-topaz.vercel.app/
