# SahayakAI: Complete End-To-End Testing Guide

This guide provides exhaustive procedures to verify the correctness, reliability, and visual coherence of the SahayakAI - Government Scheme Finder.

## 1. Environment & Setup Verification

### 1.1 Backend Bootup
1. Navigate to `backend/`.
2. Run `npm install` followed by `node server.js`.
3. **Expected result**: Terminal prints `Server running on port 5000`. 
4. Check data source: Verify `backend/data/schemes.json` is accessible (ensure the mock file has valid JSON elements).

### 1.2 Frontend Bootup
1. Navigate to `frontend/`.
2. Run `npm install` followed by `npm run dev`.
3. **Expected result**: Terminal indicates Vite server running (usually on `http://localhost:5173/`).
4. Open the browser to this local address. The dark mode glassmorphism UI should instantly load.

*Note: In the current development session, both servers have already been launched by the assistant.*

---

## 2. Unit Output & Filtering Logic Testing

SahayakAI uses an inclusive filtering system based on logical checks built in `filterService.js`:
- **Income**: Exact threshold filtering (eligible if User Income <= Scheme Income Limit).
- **Age**: Baseline filtering (eligible if User Age >= Scheme Minimum Age).
- **Category/State**: Targeted inclusion (eligible if Scheme applies to User's parameters OR is labeled 'All').

### Test Case 1: Broad Eligibility
- **Input**: Age: 30 | Income: ₹1,50,000 | Category: General | State: All India / Central Schemes
- **Expected Output**:
  - Multiple national schemes appear on the right side.
  - Data mapped natively on screen matching `schemes.json` fields.

### Test Case 2: Extreme Edge Case (Ultra High Income)
- **Input**: Age: 25 | Income: ₹50,00,000 | Category: General | State: Maharashtra
- **Expected Output**: 
  - Most schemes requiring EWS/Low-Income (like PMAY capping at ₹18 Lakhs) should be filtered out.
  - An empty state fallback should animate in: *"No schemes found... Try loosening your filters."*

### Test Case 3: State-Specific Routing
- **Input**: Age: 40 | Income: ₹80,000 | Category: All Categories | State: Maharashtra
- **Expected Output**:
  - `Maharashtra Mahatma Jyotirao Phule Jan Arogya Yojana` must successfully render alongside broad Central schemes.

### Test Case 4: Protected Demographics
- **Input**: Age: 19 | Income: ₹2,00,000 | Category: SC | State: Karnataka
- **Expected Output**: 
  - `Post-Matric Scholarship for SC Students` must display explicitly.
  - `Stand-Up India Scheme` must display.

---

## 3. UI/UX Verification

- **Glassmorphism Resilience**: Resize window to `< 768px` (Mobile view). Ensure the CSS Grid transforms the side-by-side Layout Panel into a Top/Bottom Stack layout automatically.
- **Micro-Animations**: Mouse hover over a 'Scheme Card'. The card should slightly ascend (scale up) displaying a glowing purple/indigo boundary box shadow denoting focus depth.
- **Empty Form Submission**: Try clicking "Find Schemes" without inputting anything. HTML5 validation should halt the submit and explicitly ask the user for `Age` and `Annual Income`.
- **Loading Spinners**: Notice the minimal loading spinner taking over the primary button during asynchronous transitions (simulating search waits).

---

## 4. API & External Integration (Hugging Face)

The `/api/explain-scheme` route translates dense government jargon into simple English using the free `Mistral-7B` model on Hugging Face.

### 4.1 Expected Behavior (With API Key)
1. Add `HUGGINGFACE_API_KEY=hf_xxxx...` inside `backend/.env`.
2. Restart the Node server.
3. Click **"Explain in Simple Terms"** on `PM Kisan Samman Nidhi`.
4. A small loading spinner will appear inside the button.
5. A purple AI box animates open below the steps, detailing something like: *"The government will basically deposit cash in your bank... "*

### 4.2 Expected Behavior (Fallback/No API Key)
1. Delete or rename the `.env` (so no API key exists, which is currently the default).
2. Start the Node Server.
3. Click the explain button.
4. A red error panel gracefully slides down instructing: *"Hugging Face API Key is missing on the server. Please manually add it to test this feature."* The frontend app handles this gracefully without crashing.
