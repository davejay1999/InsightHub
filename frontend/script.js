const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Get form elements
const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');

// Event listeners for switching forms
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Function to validate email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function to validate password
function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

// Sign In validation
signInForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submit action
    const username = signInForm.querySelector('input[type="text"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;
    if (!username || !password) {
        alert("Please fill in all fields for signing in.");
    } else {
        // Further validation or submission logic here
        alert("Sign in successful!"); // Placeholder action
    }
});

// Sign Up validation
signUpForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submit action
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    if (!username || !validateEmail(email) || !validatePassword(password)) {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
        } else if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        } else {
            alert("Please fill in all fields for signing up.");
        }
    } else {
        // Proceed with form submission or further validation here
        alert("Sign up successful!"); // Placeholder action
    }
});
