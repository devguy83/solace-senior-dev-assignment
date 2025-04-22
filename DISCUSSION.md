# DISCUSSION.md

## ✅ Initial Fixes (Bug Cleanup)

### 1. React Hydration Error
The original HTML placed `<th>` elements directly inside `<thead>`, which caused a mismatch between server-rendered HTML and client-rendered DOM. This violates HTML standards and caused a hydration failure. It was resolved by wrapping `<th>` elements inside a `<tr>`.

### 2. Missing Key Warnings
React requires a `key` prop for elements in a list to efficiently track updates. The `<tr>` elements and specialties `<div>` children were missing keys, causing console warnings. This has been fixed by using either `advocate.id`, `advocate.phoneNumber`, or array indices (as fallback).

### 3. Fix TypeError for `includes` on non-string
While filtering, `advocate.yearsOfExperience.includes(searchTerm)` threw an error because `yearsOfExperience` is a number. This was resolved by converting it to a string using `.toString()` before applying `.includes()`.

---

## 🧠 What I'd Do with More Time

- Refactor search state (`searchTerm`) to avoid DOM manipulation
- Add loading and empty state UI
- Improve table styling using Tailwind CSS

## 🎨 UI/UX Improvements

- Replaced all inline styles with Tailwind CSS for consistency and scalability.
- Improved spacing, form layout, and responsiveness.
- Styled table with striping, hover states, and proper column alignment.
- Added an empty state message when no advocates match the filter.
- Improved accessibility via form labels and readable font sizes.

