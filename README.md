# Social Support Assignment
The Social Support Application is React-based responsive multi-step form platform that allows individuals to apply for financial assistance.  
The app collects personal, family, and financial details, and integrates AI assistance to help users describe their situation clearly.


## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Motivation of Choices on Implementation](#motivation-of-choices-on-implementation)
   - [Project Structure Overview](#project-structure-overview)
   - [Hierarchical Organization](#hierarchical-organization)
   - [Overall Benefits](#overall-benefits)
4. [Project Architecture](#project-architecture)
5. [Project Folder Structure](#project-folder-structure)
6. [Installation](#installation)
7. [Usage](#usage)
   - [Development](#development)
   - [Build](#build)
   - [Unit Testing](#unit-testing)
   - [Code Linting](#code-linting)
8. [Screenshots](#screenshots)


## Tech Stack

This project is built using modern React best practices to ensure scalability, maintainability, and clean architecture. 
Each technology is selected to support performance, validation, state predictability, and a smooth user experience.
- [React](https://reactjs.org/) – Single Page Application architecture  
- [React Router](https://reactrouter.com/) – Client-side routing and navigation control  
- [Redux Toolkit](https://redux-toolkit.js.org/) – Centralized and predictable state management  
- [MUI](https://mui.com/) – Accessible and consistent UI component library with RTL support  
- [Zod](https://zod.dev/) – Schema-based and type-safe form validation  
- [Axios](https://axios-http.com/) – Centralized API communication layer  
- [React-i18next](https://react.i18next.com/) – Multi-language support (English & Arabic with RTL)  
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) – Unit testing and component behavior validation  

## Features

- **TypeScript implementation:** Uses TypeScript for strong type safety, better scalability, and maintainable code structure.
- **Multi-step form with validation:** Implements a structured step-by-step form with schema-based validation using Zod and React Hook Form.
- **Internationalization (i18n) with RTL support:** Supports English and Arabic languages and full Right-to-Left (RTL) layout support.
- **Redux Toolkit state management:** Centralized and predictable state handling for form data, step tracking, and global application state.
- **AI-powered assistance:** Integrates OpenAI Chat Completion API to help users generate clear and structured situation descriptions.
- **Local storage persistence:** Saves form progress locally to prevent data loss and improve user experience.
- **Centralized API layer & error handling:** Uses Axios with structured error handling and user-friendly error messages.
- **Accessibility (a11y) support:** Implements ARIA roles, keyboard navigation, and accessible UI components via MUI.
- **Code quality tools:** ESLint configuration for clean code practices and consistent development standards.
- **Environment variable configuration:** Secure API key management using `.env` setup and proper Git ignore practices.

## Motivation of Choices on Implementation

#### Project Structure Overview

The folder structure of the "Social Support Assignment" is designed to support scalability, maintainability, and clean development practices. The structure follows a modular approach, ensuring organized code, better readability, and easier feature expansion in the future.

#### Hierarchical Organization

**App Directory:** The 'app' directory contains the global store configuration.

**Pages Directory:** The 'pages' directory contains top-level components, each representing a distinct page of the application. This approach aligns with React best practices, facilitating clear separation of concerns.

**Components Directory:** The 'components' directory contains modular components used across different pages. Each component handles a specific task or piece of functionality, promoting separation of concerns, reusability, and easier maintenance.

**Routes Directory:**: The 'routes' directory contains React Router configuration and navigation logic. It manages application routing and controls page-level navigation structure.

**Services Directory:** The 'services' directory contains API logic for form submission and OpenAI integration. It manages both shared and page-level API calls, keeping external communication separate from UI components.

**Features Directory:** The 'features' directory contains feature-specific logic such as state management, validation schemas, and related business rules.

**Utils Directory:** The 'utils' directory contains reusable helper logic such as Axios configuration, local storage handling, and other common utilities.

**i18n Directory:** The 'i18n' directory contains translation files and internationalization configuration.
It manages language setup and supports multi-language functionality including RTL layout.

#### Overall Benefits

**Scalability:** Modular architecture with TypeScript and structured state management supports future growth.

**Maintainability:** Clear folder structure, linting, and organized code improve long-term maintainability.

**User Experience:** Multi-language support (i18n), accessibility practices, and validation enhance usability.

**Performance:** Optimized rendering, efficient state handling, and clean API integration ensure stable performance.

**Extensibility:** The feature-based structure allows easy updates, enhancements, and adaptation to new requirements.

## Project Architecture

**High level Diagram**

<section style="display: flex; height: 150px; padding: 5px;margin-bottom:20px;">
<img alt="High level Diagram" src="/public/assets/high-level.png">
</section>


**Component Heirarchy**

<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
<img alt="Component Heirarchy" src="/public/assets/component-heirarchy.png">
</section>


**Data flow Diagram**

<section style="display: flex; height: 200px; padding: 5px;">
<img alt="Data flow diagram" src="/public/assets/dfd.png">
</section>

## Project Folder Structure
```
social-support-assignment
├─ public
│ ├─ social-support.png
├─ src
│ ├─ App.tsx
│ ├─ main.tsx
│ ├─ components
│ │ ├─ aiHelperDialog
│ │ │ ├─ AIHelperDialog.tsx
│ │ │ ├─ AIHelperDialog.test.tsx
│ │ ├─ errorAlert
│ │ │ ├─ ErrorAlert.tsx
│ │ │ ├─ ErrorAlert.test.tsx
│ │ ├─ errorBoundry
│ │ │ ├─ ErrorBoundry.tsx
│ │ ├─ languageSwitcher
│ │ │ ├─ LanguageSwitcher.tsx
│ │ │ ├─ LanguageSwitcher.test.tsx
│ │ ├─ layout
│ │ │ ├─ MainLayout.tsx
│ │ ├─ loader
│ │ │ ├─ Loader.tsx
│ │ │ ├─ Loader.test.tsx
│ │ ├─ progressBar
│ │ │ ├─ ProgressBar.tsx
│ │ │ ├─ progressBar.test.tsx
│ │ ├─ form
| | | ├─ familyFinanceDetails
| | | | ├─ FamilyFinanceDetails.tsx
| | | | ├─ FamilyFinanceDetails.test.tsx
| | | ├─ personalDetails
| | | | ├─ PersonalDetails.tsx
| | | | ├─ PersonalDetails.test.tsx
| | | ├─ situationDetails
| | | | ├─ SituationDetails.tsx
| | | | ├─ SituationDetails.test.tsx
│ ├─ features
| │ ├─ application
│ │ │ ├─ applicationSelector.ts
│ │ │ ├─ applicationSlice.ts
│ │ │ ├─ types.ts
│ │ │ ├─ validationSchema.ts
│ ├─ pages
│ │ ├─ applicationPage.tsx
│ │ ├─ NotFound.tsx
│ │ ├─ Success.tsx
│ ├─ routes
│ │ ├─ AppRouter.tsx
│ ├─ services
│ │ ├─ application.service.ts
│ │ ├─ openai.ts
│ ├─ utils
│ │ ├─ axiosClient.ts
│ │ ├─ localStorage.ts
│ │ ├─ validation.ts
│ ├─ i18n
│ │ ├─ ar.json
│ │ ├─ en.json
│ │ ├─ index.ts
├─ .env
├─ .env.example
├─ .gitignore
├─ .eslint.config.js
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.jest.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ README.md
```

## Installation

### Prerequisites

Before proceeding with the installation, ensure you have the following prerequisites installed on your machine:

- **Node.js** (version 20 or higher)
- **npm** (Node Package Manager)

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/aakashsinghpatel/social-support-assignment
```

2. Navigate to the project directory:

```bash
  cd social-support-assignment
```

3. Install project dependencies:

```bash
  npm install
```
4. Environment Variables Setup

This project requires environment variables.
Create a .env file in the root directory by copying the example file:
**Windows**
```bash 
copy .env.example .env
```
**Mac**
```bash 
cp .env.example .env
```
Then add your OpenAI API key:
```bash
VITE_OPENAI_KEY=your_openai_api_key_here

```

## Usage

### Development

To run the application in development mode:

```bash
  npm run dev
```

This command starts the development server. Open your browser and visit http://localhost:5173 to view the application.

### Build

To build the application for production on Linux:

```bash
  npm run build
```

### Unit Testing

Run unit tests using:

```bash
  npm run test
```

### Code Linting

Lint your TypeScript code with:

```bash
  npm run lint
```

Fix linting issues automatically:

```bash
  npm run lint-fix
```

### Screenshots
**English**
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Personal Details" src="/public/screenshots/Desktop-Personal.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Family Finance" src="/public/screenshots/Desktop-FamilyFinance.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Situation" src="/public/screenshots/Situation.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="AI suggestion Modal" src="/public/screenshots/Suggestion-dialog.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Success" src="/public/screenshots/success.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
<img alt="Not Found Page" src="/public/screenshots/404.png">
</section>
**Arabic**
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Personal Arabic" src="/public/screenshots/Destop-Personal-Arabic.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Family Finance Arabic" src="/public/screenshots/Desktop-FamilyFinance-Arabic.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Situation Arabic" src="/public/screenshots/Situation-Arabic.png">
</section>
<section style="display: flex; height: 200px; padding: 5px;margin-bottom:20px;">
  <img alt="Success Arabic" src="/public/screenshots/success-arabic.png">
</section>

