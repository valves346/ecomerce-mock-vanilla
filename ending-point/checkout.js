// Payment widget integration

initializePaymentWidget()
async function initializePaymentWidget() {
  try {
    //Get a reference to de html elemnt where we'll insert the widget
    const container = document.getElementById("checkout")

    // Get the total amount from the DOM and convert it to cents
    const quantity = sessionStorage.getItem("productQuantity") || 1
    const total = sessionStorage.getItem("productTotal") || "129.99"

    const widgetConfig = {
      backgroundColor: "green",
      textColor: "red",
      showBrlaLogo: false,
      showPoweredBy: false,
    }

    // Create payment session
    const response = await fetch(
      "https://widget-server-1.onrender.com/payment-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(quantity * parseFloat(total) * 100),
          currency: "BRL",
          customer: { name: "Cliente Teste", email: "cliente@exemplo.com" },
          widgetConfig,
        }),
      }
    )

    if (!response.ok) throw new Error("Failed to create payment session")

    const data = await response.json()
    console.log("✅ Payment session created successfully", {
      sessionId: data.sessionId,
    })

    // Check if Brla is available and we have a session ID
    if (window.Brla && data.sessionId) {
      console.log("🔄 Mounting widget in container...")
      const brla = new window.Brla()
      // Mount the widget in the container with session ID
      brla.mount(data.sessionId, "checkout", widgetConfig)
      console.log("✅ Widget mounted successfully")
    } else {
      throw new Error("Widget not available or invalid session ID")
    }
  } catch (err) {
    console.error("❌ Error setting up the widget:", err)
  }
}
