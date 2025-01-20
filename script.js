function validateInputs() {
  let isValid = true;
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTenure = parseFloat(document.getElementById("loanTenure").value);

  // Loan Amount Validation
  if (isNaN(loanAmount) || loanAmount <= 0) {
    document.getElementById("loanAmountError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("loanAmountError").classList.add("hidden");
  }

  // Interest Rate Validation
  if (isNaN(interestRate) || interestRate <= 0) {
    document.getElementById("interestRateError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("interestRateError").classList.add("hidden");
  }

  // Loan Tenure Validation
  if (isNaN(loanTenure) || loanTenure <= 0) {
    document.getElementById("loanTenureError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("loanTenureError").classList.add("hidden");
  }

  return isValid;
}

function calculateEMI() {
  if (!validateInputs()) {
    return;
  }

  // Show loading spinner and overlay
  document.getElementById("loadingSpinner").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");

  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTenure = parseFloat(document.getElementById("loanTenure").value);

  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = loanTenure * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  const totalPayment = emi * numberOfMonths;
  const totalInterest = totalPayment - loanAmount;

  // Update EMI result
  document.getElementById("emiAmount").innerHTML = `Monthly EMI: ₹<span>${emi.toFixed(2)}</span>`;
  document.getElementById("totalPayment").innerHTML = `Total Payment (Principal + Interest): ₹<span>${totalPayment.toFixed(2)}</span>`;
  document.getElementById("totalInterest").innerHTML = `Total Interest Payable: ₹<span>${totalInterest.toFixed(2)}</span>`;

  // Hide the spinner, overlay and show the result section after a delay
  setTimeout(function () {
    document.getElementById("loadingSpinner").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
    const resultSection = document.getElementById("result");
    resultSection.classList.remove("hidden");
    resultSection.style.opacity = "1";
    resultSection.style.transform = "scale(1)";
  }, 1500);   // Adjust the time as per your preference (in ms)
}

function resetForm() {
  document.getElementById("emiForm").reset();
  document.getElementById("loanAmountError").classList.add("hidden");
  document.getElementById("interestRateError").classList.add("hidden");
  document.getElementById("loanTenureError").classList.add("hidden");

  const resultSection = document.getElementById("result");
  resultSection.classList.add("hidden");
}
