# Gemini Chat App


## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Google Gemini API** - AI chat functionality
- **CSS3** - Styling and animations

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

The app requires a Google Gemini API key. Get yours from the [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to your `.env` file.

---

## Data Structures & Algorithms

### Linked List Cycle Detection

**Problem**: Detect if a linked list has a cycle and find the starting node of the cycle.

**Solution Approach**:

```javascript
var detectCycle = function(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 1) Detect if a cycle exists
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // 2) Found meeting point inside cycle
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow; // start of cycle
    }
  }

  // No cycle
  return null;
};
```

#### Algorithm Explanation:

**Floyd's Cycle Detection Algorithm (Tortoise and Hare)**

1. **Phase 1 - Cycle Detection**:
   - Use two pointers: `slow` (moves 1 step) and `fast` (moves 2 steps)
   - If there's a cycle, the fast pointer will eventually meet the slow pointer
   - If no cycle exists, the fast pointer will reach the end (null)

2. **Phase 2 - Find Cycle Start**:
   - When pointers meet, reset `slow` to head
   - Move both pointers one step at a time
   - The point where they meet again is the start of the cycle

**Time Complexity**: O(n) - Linear time
**Space Complexity**: O(1) - Constant space


## License

This project is open source and available under the [MIT License](LICENSE).
