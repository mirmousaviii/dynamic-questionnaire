# Dynamic Questionnaire

## Overview

This project is a **dynamic questionnaire web application** that allows users to complete surveys based on predefined schemas. The backend provides the questionnaire structure via a **JSON-based API**, and the frontend dynamically renders the questions based on user input and schema dependencies.

### Key Features

- **Dynamic Questionnaire:** Backend-defined schema for flexible forms.
- **Step-by-Step Navigation:** Users can navigate between steps and save responses.
- **Conditional Logic:** Questions appear based on previous answers.
- **RESTful API:** Standardized API endpoints for managing questionnaires and responses.

### TODO

- **Supporting Multiple Conditions** Extend dependencies to support multiple conditions using an array.
- **Production deployment:** Host frontend on Vercel and backend on Railway.
- **Code style configuration:** Configure ESLint and Prettier for consistent code style.
- **Unit tests:** Set up Jest based for backend and frontend unit tests.
- **E2E tests:** Implement Cypress for end-to-end testing.
- **Data visualization:** Pie charts and bar charts for responses.
- **User authentication:** JWT-based login & registration.
- **Editing responses:** Allow users to update answers.

## Tech Stack

- **Frontend:** React, Next.js, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Other Tools:** Docker

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)

### Steps to Run Locally

Will be complete...

## API Documentation

**API Endpoint***

| Method | Endpoint | Description | Status Code |
|--------|----------------------------------|------------------------------------------------------|-------------|
| `GET`  | `/api/v1/questionnaires` | Retrieve the list of questionnaires | 200 OK |
| `POST` | `/api/v1/questionnaires` | Create a new questionnaire | 201 Created |
| `GET`  | `/api/v1/questionnaires/{ID}` | Retrieve details of a questionnaire (title, description, number of steps) | 200 OK / 404 Not Found |
| `GET`  | `/api/v1/questionnaires/{ID}/steps/{StepID}` | Retrieve questions of a specific step in the questionnaire | 200 OK / 404 Not Found |
| `POST` | `/api/v1/questionnaires/{ID}` | Store responses of a questionnaire in the backend | 201 Created / 400 Bad Request |
| `GET`  | `/api/v1/questionnaires/{ID}/responses` | Retrieve the list of all responses for a questionnaire | 200 OK |
| `GET`  | `/api/v1/questionnaires/{ID}/responses/{ResponseID}` | Retrieve a specific response for a questionnaire | 200 OK / 404 Not Found |

### **1. Retrieve the list of questionnaires**

**Request:**

```http
GET /api/v1/questionnaires
```

**Response:**

```json
[
  {
    "questionnaire_id": 1,
    "title": "Personal Information",
    "description": "Personal information with details",
    "total_steps": 2
  },
  {
    "questionnaire_id": 2,
    "title": "Employee Feedback Form",
    "description": "An internal feedback survey for employees",
    "total_steps": 5
  }
]
```

### **2. Create a new questionnaire**

**Request:**

```http
POST /api/v1/questionnaires
Content-Type: application/json
```

**Request Body:**

```http
{
  "title": "Employee Feedback Survey",
  "description": "A survey to gather feedback from employees",
  "total_steps": 1,
  "steps": [
    {
      "step_id": 1,
      "title": "General Information",
      "questions": [
        {
          "question_id": "1",
          "question": "What is your name?",
          "type": "text"
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "message": "Questionnaire created successfully",
  "questionnaire_id": 5
}
```

### **3. Retrieve details of a questionnaire**

**Request:**

```http
GET /api/v1/questionnaires/1
```

**Response:**

```json
{
  "id": 1,
  "title": "Personal Information",
  "description": "Personal information with details",
  "total_steps": 2,
  "steps": [
    {
      "step_id": 1,
      "step_title": "Basic Information",
      "questions": [
        {
          "question_id": "1",
          "question": "What is your name?",
          "type": "text",
          "options": [],
          "dependency": null
        },
        {
          "question_id": "2",
          "question": "Where are you?",
          "type": "text",
          "options": [],
          "dependency": null
        }
      ]
    },
    {
      "step_id": 2,
      "step_title": "Family Information",
      "questions": [
        {
          "question_id": "3",
          "question": "Do you have children?",
          "type": "radio",
          "options": ["Yes", "No"],
          "dependency": null
        },
        {
          "question_id": "4",
          "question": "How many children do you have?",
          "type": "text",
          "options": [],
          "dependency": {
            "question_id": "3",
            "operator": "equals",
            "value": "Yes"
          }
        }
      ]
    }
  ]
}
```

### **4. Retrieve questions of a specific step**

**Request:**

```http
GET /api/v1/questionnaires/1/steps/2
```

**Response:**

```json
{
  "step_id": 2,
  "step_title": "Family Information",
  "questions": [
        {
          "question_id": "3",
          "question": "Do you have children?",
          "type": "radio",
          "options": ["Yes", "No"],
          "dependency": null
        },
        {
          "question_id": "4",
          "question": "How many children do you have?",
          "type": "text",
          "options": [],
          "dependency": {
            "question_id": "3",
            "operator": "equals",
            "value": "Yes"
          }
        }
      ]
}
```

### **5. Store responses of a questionnaire**

**Request:**

```http
POST /api/v1/questionnaires/1
Content-Type: application/json
```

**Request Body:**

```json
{
  "1": "Mostafa",
  "2": "Berlin",
  "3": "Yes"
}

```

**Response:**

```json
{
  "message": "Responses saved successfully",
  "status": "partial"
}
```

### **6. Retrieve all responses for a questionnaire**

**Request:**

```http
GET /api/v1/questionnaires/1/responses
```

**Response:**

```json
[
  {
    "response_id": "r001",
    "questionnaire_id": "1",
    "created_at": "2024-10-11"
  }
]
```

### **7. Retrieve a specific response**

**Request:**

```http
GET /api/v1/questionnaires/1/responses/r001
```

**Response:**

```json
{
  "response_id": "r001",
  "created_at": "2024-10-11",
  "answers": {
    "1": "Daily",
    "2": "Easy to use interface"
  }
}
```

## Conditional Logic (`dependency` Field)

To handle **dynamic question visibility**, we use structured dependencies:

```json
{
  "question_id": "4",
  "question": "How many children do you have?",
  "type": "text",
  "options": [],
  "dependency": {
    "question_id": "3",
    "operator": "equals",
    "value": "Yes"
  }
}
```

### Supported Operators

| Operator | Meaning |
|----------|---------|
| `equals` | Must be equal |
| `not_equals` | Must not be equal |
| `greater_than` | Must be greater |
| `less_than` | Must be smaller |
| `in` | Must be one of the values |
| `not_in` | Must NOT be one of the values |

## Project Structure

Will be complete...

## Screenshots

Will be complete...

## FAQ

Will be complete...
