# DISCUSSION.md

## Overview

This assignment involved improving a full-stack Next.js application that lists and filters advocate profiles. The goals were to fix bugs, clean up anti-patterns, improve the UI/UX using Tailwind CSS, and address performance issues for scalability. Below are the changes I implemented and what I would improve further with more time.

---

## Initial Fixes (Bug Cleanup)

### 1. React Hydration Error
The original HTML placed `<th>` elements directly inside `<thead>`, which caused a mismatch between server-rendered HTML and client-rendered DOM. This violates HTML standards and caused a hydration failure. It was resolved by wrapping `<th>` elements inside a `<tr>`.

### 2. Missing Key Warnings
React requires a `key` prop for elements in a list to efficiently track updates. The `<tr>` elements and specialties `<div>` children were missing keys, causing console warnings. This has been fixed by using either `advocate.id`, `advocate.phoneNumber`, or array indices (as fallback).

### 3. Fix TypeError for `includes` on non-string
While filtering, `advocate.yearsOfExperience.includes(searchTerm)` threw an error because `yearsOfExperience` is a number. This was resolved by converting it to a string using `.toString()` before applying `.includes()`.

---

## UI/UX Improvements

- Replaced all inline styles with Tailwind CSS for consistency and scalability.
- Styled the advocate table with:
  - Header row highlighting
  - Alternating background colors for rows
  - Hover effects for better visual feedback
- Improved layout of the search form with padding, spacing, labels, and responsive sizing.
- Added an empty state for when no advocates match the search query.

---

## Performance Improvements

### 1. Backend-Side Filtering
- Moved filtering logic from the frontend to the backend to support scalability with large datasets.
- Introduced a query parameter `q` (e.g., `/api/advocates?q=social`) which the backend uses to return filtered data.

### 2. Debounced Search
- Added debounced input handling using `lodash.debounce` to avoid firing a request with every keystroke.

### 3. Result Limiting
- Capped the number of returned advocates to 25 per request to simulate pagination and prevent excessive data loading.

---

## 📂 Pull Requests Submitted

1. **[fix/bugs-th-key]**  
   Fixed invalid HTML structure and added missing `key` props.

2. **[improve/ui-ux]**  
   Applied Tailwind styling, improved layout, and added visual enhancements to the advocate list UI.

3. **[improve/performance]**  
   Moved filtering logic to the backend, added debounced search input, and limited returned results for better performance.

---

Thanks for the opportunity to work on this. It was fun digging into a real-world full-stack Next.js app, and I’d be excited to contribute even further in a team setting!
