import axios from "axios"; // Import the Axios library for making HTTP requests

// --- The Frontend "Dining Room" ---

// 1. Get references to the HTML elements we need to interact with.
// The '!' tells TypeScript "I am certain this element exists".
const fibForm = document.getElementById("fib-form")!;
const numberInput = document.getElementById(
  "number-input",
)! as HTMLInputElement;
const resultContainer = document.getElementById("result-container")!;
const resultText = document.getElementById("result-text")!;

// The address of our Python backend server.
const API_URL = "http://localhost:5000/fibonacci";

// 2. Add an event listener to the form. This function will run when the form is submitted.
fibForm.addEventListener("submit", async (event) => {
  // Prevent the default browser behavior of refreshing the page on form submission.
  event.preventDefault();

  // Clear previous results and show a loading message.
  resultText.textContent = "Calculating...";
  resultContainer.classList.remove("bg-red-500"); // Remove error styling if it exists
  resultContainer.classList.add("bg-slate-700");

  try {
    // 3. Get the value from the input box and convert it to an integer.
    const number = parseInt(numberInput.value, 10);

    // Simple validation to ensure it's a number.
    if (isNaN(number)) {
      throw new Error("Please enter a valid number.");
    }

    // 4. Send the number to the backend API using Axios.
    // We use 'await' to wait for the backend's response before continuing.
    // The data is sent in the exact format our Flask backend expects: { "number": ... }
    const response = await axios.post(API_URL, {
      number: number,
    });

    // 5. Extract the fibonacci number from the response and display it.
    const fibResult = response.data.fibonacci;
    resultText.textContent = `The Fibonacci number is: ${fibResult}`;
  } catch (error) {
    // 6. If anything goes wrong (e.g., backend is down, network error, bad input),
    // display an error message to the user.
    resultText.textContent = "An error occurred. Please try again.";
    resultContainer.classList.add("bg-red-500"); // Add error styling
    console.error("Error fetching Fibonacci number:", error); // Log the technical error for the developer
  }
});
