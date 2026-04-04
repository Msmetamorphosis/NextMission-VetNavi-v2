# NextMission Navigator

NextMission Navigator is an AI powered web platform designed to help U.S. military veterans transition into civilian life by generating personalized, structured action plans.

This project combines large language models with structured validation, retrieval logic, and domain specific knowledge to create practical, actionable guidance for veterans.

---

## 🚀 Core Features

### 1. AI Action Plan Generation
- Users enter a goal such as:
  - "I want to use my GI Bill for a cybersecurity degree"
  - "I want to buy a house using my VA loan"
- The system generates a structured, step by step plan

---

### 2. Structured Output (Zod Validation)
- All AI responses are normalized and validated using a strict schema
- Prevents malformed or unreliable outputs
- Ensures consistency across all generated plans

---

### 3. Hybrid AI Engine (LLM + Logic)
- Uses OpenAI (GPT 4o) for reasoning and step generation
- Uses deterministic logic for:
  - data normalization
  - scoring and prioritization
  - system reliability

---

### 4. Resource Retrieval Layer (Early RAG)
- Matches user goals to relevant veteran resources
- Uses a tagged dataset for scoring relevance
- Injects recommended resources into action plan steps

---

### 5. Modular Architecture
Frontend (React / Next.js)
- API Route
- Action Plan Engine
- LLM Generation
- Normalization Layer
- Validation (Zod)
- Resource Matching
- Structured Output → UI
---

## 🧠 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- OpenAI API (GPT 4o)
- Zod (schema validation)
- Tailwind CSS
- Local structured data (resource knowledge base)

---

## 📂 Project Structure
src/
├── app/
│ ├── api/action-plan/route.ts
│ ├── resources/page.tsx
│ └── page.tsx
│
├── components/
│ └── ActionPlanGenerator.jsx
│
├── core/
│ ├── engine/localActionPlan.engine.ts
│ ├── schema/actionPlan.schema.ts
│
├── data/
│ └── resources/baseResources.ts
---

## ⚙️ How It Works

1. User submits a goal
2. API receives request
3. Engine:
   - calls LLM
   - normalizes response into schema
   - validates output
   - injects relevant resources
4. UI renders structured plan

---

## 🔥 Current Capabilities

- Generates structured, validated action plans
- Handles inconsistent LLM output via normalization
- Injects relevant resources based on goal matching
- Provides a working end to end AI pipeline

---

## 🚧 In Progress / Roadmap

### 🔹 Smart Resource Matching
- Improve tag based scoring
- Match resources per step instead of globally

### 🔹 Location Awareness
- Base specific and region specific recommendations
- Example: Tampa / MacDill AFB resource mapping

### 🔹 Benefit Logic Layer
- GI Bill, VR&E, disability eligibility logic
- Deterministic + AI assisted reasoning

### 🔹 User Persistence
- Save plans
- Track progress
- Personalized recommendations

### 🔹 Enhanced UI
- Expandable steps
- Better UX for resources
- Multi page polished interface

---

## 🎯 Purpose

This project is designed as:
- a capstone project
- a portfolio level AI system
- a real world application of hybrid AI architecture

It demonstrates:
- Advanced prompt engineering for controlled, high fidelity AI outputs  
- End to end AI system design integrating LLMs with deterministic logic layers  
- Schema driven validation to enforce consistency and production grade reliability  
- Retrieval augmented generation using structured, domain specific knowledge bases  
- Full stack AI integration within a scalable, modular web application architecture  

---

## 🧩 Future Vision

NextMission Navigator will evolve into a full platform that:

- guides veterans through complex systems
- provides localized and personalized support
- integrates real time data sources
- acts as an intelligent transition advisor

---
👤 Author

Crystal Tubbs
AI & Emerging Technologies | Prompt Engineering | AI Systems Design
