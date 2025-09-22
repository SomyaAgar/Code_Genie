# Code Genie – AI-Powered Coding Assistant
Coder Buddy is an AI-powered coding assistant built with LangChain, LangGraph, Pydantic, and Python.
It works like a multi-agent development team that transforms natural language requests into complete, working projects — file by file — using real developer workflows.

## Features
- Planner Agent → Understands user requests and generates a detailed project plan.
- Architect Agent → Breaks down the plan into specific engineering tasks with explicit context for each file.
- Coder Agent → Implements tasks, writes code directly into files, and uses available tools like a real developer.
- Multi-Agent Workflow → Mimics a software team: planning, architecting, coding.
- Fast Prototyping → Build web apps, APIs, or scripts from natural language prompts.

## Architecture
User Prompt
   │
   ▼
Planner Agent → Architect Agent → Coder Agent
   │
   ▼
Generated Project (file-by-file, with real workflows)

## Installation

### Prerequisites
- anaconda installed (for environment management)
- A Groq account and API key

## Setup
1. Create and activate virtual environment
2. Install dependencies - pip install -r requirements.txt 
3. Add your API keys in .env
4. Run the app - python main.py

## Example Prompts
- “Create a to-do list application using HTML, CSS, and JavaScript.”
- “Build a simple calculator web app.”
- “Generate a blog API in FastAPI with SQLite backend.”

## Tech Stack
1. LangChain → LLM orchestration
2. LangGraph → Multi-agent workflows
3. Pydantic → Data validation
4. Python → Core development
5. Groq API → LLM inference

## Future Enhancements
1. Create a user inteface for interactive user experience.
2. Extend agent capabilities for testing and deployment
3. Enable Git integration (commit + push generated projects)
