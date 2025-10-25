// // In your React component
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// // Example usage
// const callGeminiAPI = async () => {
//   try {
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: "Hello, how are you?"
//           }]
//         }]
//       })
//     });
    
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//   }
// };