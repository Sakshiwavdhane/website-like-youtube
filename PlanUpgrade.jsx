import React, { useState } from "react";
import "./PlanUpgrade.css";

const plans = {
  free: { name: "Free", duration: 5, cost: 0 },
  bronze: { name: "Bronze", duration: 7, cost: 10 },
  silver: { name: "Silver", duration: 10, cost: 50 },
  gold: { name: "Gold", duration: "Unlimited", cost: 100 },
};

const generateCoupon = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let coupon = "";
  for (let i = 0; i < 6; i++) {
    coupon += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return coupon;
};

export default function PlanUpgrade() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    let finalCost = plans[selectedPlan].cost;
    if (appliedCoupon) {
      finalCost = finalCost * 0.9; // Apply 10% discount
    }

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      sendEmailInvoice(plans[selectedPlan].name, finalCost.toFixed(2));
    }, 1000);
  };

  const sendEmailInvoice = (planName, amount) => {
    // Simulate email sending
    console.log(`Email sent: Congratulations! You have upgraded to the ${planName} plan. The total cost is ${amount} INR.`);
  };

  return (
    <div className="plan-upgrade-container">
      <div className="plans">
        {Object.keys(plans).map((planKey) => (
          <div
            key={planKey}
            className={`plan-card ${selectedPlan === planKey ? "selected" : ""}`}
            onClick={() => setSelectedPlan(planKey)}
          >
            <h3>{plans[planKey].name}</h3>
            <p>Duration: {plans[planKey].duration} {planKey === 'gold' ? "" : "mins"}</p>
            <p>Cost: {plans[planKey].cost} INR</p>
          </div>
        ))}
      </div>
      <div className="payment-section">
        <h3>Coupon Code: {coupon || "Click to generate"}</h3>
        <button onClick={() => setCoupon(generateCoupon())} disabled={!!coupon}>
          Generate Coupon
        </button>
        {coupon && (
          <button onClick={() => setAppliedCoupon(true)} disabled={appliedCoupon}>
            Apply Coupon
          </button>
        )}
        <button className="pay-button" onClick={handlePayment}>
          Pay {appliedCoupon ? (plans[selectedPlan].cost * 0.9).toFixed(2) : plans[selectedPlan].cost} INR
        </button>
      </div>
      {paymentSuccess && <p className="success-message">Payment Successful! Check your email for the invoice.</p>}
    </div>
  );
}
