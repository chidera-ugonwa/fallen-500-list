declare global {
  interface Window {
    Paddle: any;
  }
}

const PADDLE_CLIENT_TOKEN = "live_32d52a8c56592773a064277b89c";
const PADDLE_PRICE_ID = "pri_01kh3s6a3bht5qhfnqj5rkv74p";

let paddleInitialized = false;

function initPaddle() {
  if (paddleInitialized || !window.Paddle) return;
  window.Paddle.Initialize({
    token: PADDLE_CLIENT_TOKEN,
  });
  paddleInitialized = true;
}

interface PaddleCheckoutOptions {
  email: string;
  userId: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function openPaddleCheckout({
  email,
  userId,
  onSuccess,
  onClose,
}: PaddleCheckoutOptions) {
  initPaddle();

  if (!window.Paddle) {
    throw new Error("Paddle.js not loaded");
  }

  window.Paddle.Checkout.open({
    items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
    customer: { email },
    customData: { user_id: userId },
    settings: {
      successUrl: `${window.location.origin}/profile?payment=success`,
      allowLogout: false,
    },
    onComplete: () => {
      onSuccess?.();
    },
    onClose: () => {
      onClose?.();
    },
  });
}
