const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

// Toggle password visibility
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
  } else {
    input.type = "password";
    icon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
  }
}

// Validation patterns
const patterns = {
  name: /^[A-Za-z\s'-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10,11}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// Validation functions
function validateName(input, errorElement) {
  const value = input.value.trim();
  if (value === "" || !patterns.name.test(value)) {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validateEmail(input, errorElement) {
  const value = input.value.trim();
  if (value === "" || !patterns.email.test(value)) {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validatePhone(input, errorElement) {
  const value = input.value.trim();
  if (value === "" || !patterns.phone.test(value)) {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validateBirthdate(input, errorElement) {
  if (input.value === "") {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validateGender(errorElement) {
  const selected = document.querySelector('input[name="gender"]:checked');
  if (!selected) {
    errorElement.style.display = "block";
    return false;
  }
  errorElement.style.display = "none";
  return true;
}

function validateAddress(input, errorElement) {
  if (input.value.trim() === "") {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validatePassword(input, errorElement) {
  const value = input.value;
  if (value === "" || !patterns.password.test(value)) {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validateConfirmPassword(input, errorElement) {
  const password = document.getElementById("password").value;
  if (input.value === "" || input.value !== password) {
    showError(input, errorElement);
    return false;
  }
  showSuccess(input, errorElement);
  return true;
}

function validateTerms(input, errorElement) {
  if (!input.checked) {
    errorElement.style.display = "block";
    return false;
  }
  errorElement.style.display = "none";
  return true;
}

function showError(input, errorElement) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  errorElement.style.display = "block";
}

function showSuccess(input, errorElement) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorElement.style.display = "none";
}

// Real-time validation
document.getElementById("firstName").addEventListener("blur", function () {
  validateName(this, document.getElementById("firstNameError"));
});

document.getElementById("lastName").addEventListener("blur", function () {
  validateName(this, document.getElementById("lastNameError"));
});

document.getElementById("email").addEventListener("blur", function () {
  validateEmail(this, document.getElementById("emailError"));
});

document.getElementById("phone").addEventListener("blur", function () {
  validatePhone(this, document.getElementById("phoneError"));
});

document.getElementById("birthdate").addEventListener("blur", function () {
  validateBirthdate(this, document.getElementById("birthdateError"));
});

document.getElementById("address").addEventListener("blur", function () {
  validateAddress(this, document.getElementById("addressError"));
});

document.getElementById("password").addEventListener("blur", function () {
  validatePassword(this, document.getElementById("passwordError"));
});

document
  .getElementById("confirmPassword")
  .addEventListener("blur", function () {
    validateConfirmPassword(
      this,
      document.getElementById("confirmPasswordError")
    );
  });

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate all fields
  const isFirstNameValid = validateName(
    document.getElementById("firstName"),
    document.getElementById("firstNameError")
  );
  const isLastNameValid = validateName(
    document.getElementById("lastName"),
    document.getElementById("lastNameError")
  );
  const isEmailValid = validateEmail(
    document.getElementById("email"),
    document.getElementById("emailError")
  );
  const isPhoneValid = validatePhone(
    document.getElementById("phone"),
    document.getElementById("phoneError")
  );
  const isBirthdateValid = validateBirthdate(
    document.getElementById("birthdate"),
    document.getElementById("birthdateError")
  );
  const isGenderValid = validateGender(document.getElementById("genderError"));
  const isAddressValid = validateAddress(
    document.getElementById("address"),
    document.getElementById("addressError")
  );
  const isPasswordValid = validatePassword(
    document.getElementById("password"),
    document.getElementById("passwordError")
  );
  const isConfirmPasswordValid = validateConfirmPassword(
    document.getElementById("confirmPassword"),
    document.getElementById("confirmPasswordError")
  );
  const isTermsValid = validateTerms(
    document.getElementById("terms"),
    document.getElementById("termsError")
  );

  // Check if all validations passed
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isBirthdateValid &&
    isGenderValid &&
    isAddressValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isTermsValid
  ) {
    // Show success message
    successMessage.style.display = "block";

    // Log form data (in real app, this would be sent to server)
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      birthdate: document.getElementById("birthdate").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      address: document.getElementById("address").value,
    };
    console.log("Form submitted successfully:", formData);

    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      document.querySelectorAll(".is-valid").forEach((el) => {
        el.classList.remove("is-valid");
      });
      successMessage.style.display = "none";
    }, 2000);
  } else {
    // Scroll to first error
    const firstError = document.querySelector(".is-invalid");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});
