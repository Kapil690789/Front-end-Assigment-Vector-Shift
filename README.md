# VectorShift - Frontend Technical Assessment

A full-stack, interactive pipeline editor for building, validating, and analyzing node-based workflows with a React frontend and FastAPI backend.

🔗 **[View on GitHub](https://github.com/Kapil690789/Front-end-Assigment-Vector-Shift)**

## 🚀 Core Features

### Assignment Requirements

**Part 1: Node Abstraction**  
A flexible `BaseNode.js` component powers all node types (Input, LLM, Output, Text), ensuring consistent design and reusable logic across the application.

**Part 2: Styling**  
Professional dark-theme UI built from scratch using Tailwind CSS, providing a cohesive visual experience throughout the application.

**Part 3: Dynamic Text Node**  
Fully functional text node with automatic variable detection. Parses content for `{{variable}}` patterns and dynamically creates input handles. Features `TextareaAutosize` for seamless content expansion.

**Part 4: Backend Integration**  
The Submit button sends pipeline data to a FastAPI backend that validates the workflow as a Directed Acyclic Graph (DAG) and returns a detailed analysis report.

## ✨ Advanced Features

### State Persistence
Workflows automatically save to localStorage, ensuring no data loss on page refresh or accidental closure.

### Intelligent Validation
The backend performs comprehensive DAG analysis and returns the optimal topological execution order, not just boolean validation.

### Production-Ready Testing
Full pytest suite with 100% coverage of DAG validation logic, ensuring reliability and correctness.

### Enhanced User Experience
- **Smart Notifications**: Non-blocking toast messages for real-time feedback
- **Loading States**: Visual indicators during API calls with disabled controls
- **Visual Clarity**: Icon-enhanced nodes for instant recognition
- **Keyboard Navigation**: Delete nodes and edges using Backspace/Delete keys
- **Responsive Design**: Fluid layouts that adapt to different screen sizes

## 💻 Tech Stack

**Frontend**
- React
- React Flow
- Zustand (state management)
- Tailwind CSS
- react-hot-toast
- react-icons

**Backend**
- Python 3
- FastAPI
- Uvicorn

**Testing**
- pytest
- httpx

## 🛠️ Setup and Installation

### Prerequisites
- Node.js and npm
- Python 3.8+

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

Open a new terminal:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open automatically at `http://localhost:3000`

## 🧪 Running Tests

The backend includes comprehensive pytest coverage for DAG validation logic.

```bash
# Navigate to the backend directory
cd backend

# Activate the virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run the test suite
pytest
```

Expected output: All 3 tests pass (`test_valid_dag`, `test_invalid_dag_with_cycle`, `test_read_root`)

## 📝 Generating Requirements

To regenerate `requirements.txt` after adding new dependencies:

```bash
cd backend
source venv/bin/activate
pip freeze > requirements.txt
```

## 🎯 Usage

1. **Build Your Pipeline**: Drag nodes from the sidebar onto the canvas
2. **Connect Nodes**: Create edges by dragging from output handles to input handles
3. **Configure Variables**: Use `{{variable}}` syntax in Text nodes to create dynamic inputs
4. **Validate**: Click Submit to analyze your pipeline's structure
5. **Save**: Your work is automatically preserved in localStorage

## 📂 Project Structure

```
.
├── backend/
│   ├── __pycache__/
│   ├── main.py
│   └── test_main.py
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── outputNode.js
│   │   │   └── textNode.js
│   │   ├── App.js
│   │   ├── draggableNode.js
│   │   ├── FlowControls.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── toolbar.js
│   │   └── ui.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── README.md
│   └── VectorShift - Frontend Technical Assessment.pdf
├── emphasized items
└── README.md
```

## 🔍 API Endpoints

- `GET /` - Health check endpoint
- `POST /pipelines/parse` - Validates pipeline DAG structure and returns execution order

## 📄 License

This project is submitted as part of the VectorShift technical assessment.
