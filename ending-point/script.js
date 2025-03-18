document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const decreaseBtn = document.getElementById("decrease-btn")
  const increaseBtn = document.getElementById("increase-btn")
  const quantityInput = document.getElementById("quantity")
  const summaryQuantity = document.getElementById("summary-quantity")
  const summaryTotal = document.getElementById("summary-total")
  const continueBtn = document.getElementById("continue-btn")

  // Product price
  const productPrice = 129.99

  // Update quantity and total
  function updateQuantity() {
    const quantity = parseInt(quantityInput.value)

    // Update summary
    summaryQuantity.textContent = quantity
    const total = (productPrice * quantity).toFixed(2)
    summaryTotal.textContent = `$${total}`
  }

  // Event listeners for quantity buttons
  decreaseBtn.addEventListener("click", function () {
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1
      updateQuantity()
    }
  })

  increaseBtn.addEventListener("click", function () {
    if (parseInt(quantityInput.value) < 10) {
      quantityInput.value = parseInt(quantityInput.value) + 1
      updateQuantity()
    }
  })

  // Manual input handler
  quantityInput.addEventListener("change", function () {
    // Ensure the value is between 1 and 10
    if (parseInt(this.value) < 1) {
      this.value = 1
    } else if (parseInt(this.value) > 10) {
      this.value = 10
    }

    updateQuantity()
  })

  // Continue to payment button
  continueBtn.addEventListener("click", function () {
    // Store quantity in session storage for the payment page
    sessionStorage.setItem("productQuantity", quantityInput.value)
    sessionStorage.setItem(
      "productTotal",
      summaryTotal.textContent.substring(1)
    )

    // Redirect to payment page
    window.location.href = "payment.html"
  })
})
