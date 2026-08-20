import { franchise } from "@/constants/constant";
import { BASE_API_URL } from "@/utils/config";

export interface NPSInitiateRequest {
  order_id?: number | null;
  amount: number;
  remarks?: string;
  instrument_code?: string;
  response_url?: string;
}

export interface NPSInitiateResponse {
  merchant_txn_id: string;
  process_id: string;
  gateway_form: {
    action_url: string;
    method: string;
    enctype: string;
    form_fields: Record<string, string>;
  };
}

export interface NPSVerifyResponse {
  id: number;
  merchant_txn_id: string;
  process_id: string;
  gateway_txn_id?: string;
  amount: string;
  service_charge?: string;
  status: string;
  institution?: string;
  instrument?: string;
  transaction_remarks?: string;
  cbs_message?: string;
  order?: number | null;
}

/**
 * Initiate NPS Payment Checkout
 * Pass order_id as null for Payment-First flow (Option B)
 */
export const initiateNPSPayment = async (
  amount: number,
  orderId: number | null = null,
  remarks: string = "Pre-order Checkout",
  responseUrl?: string,
): Promise<NPSInitiateResponse> => {
  const defaultCallback = `${window.location.origin}/payment/nps/callback`;

  const res = await fetch(`${BASE_API_URL}/nps/initiate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: orderId || null,
      amount,
      remarks,
      franchise,
      response_url: responseUrl || defaultCallback,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail || errorData.message || "Failed to initiate NPS payment",
    );
  }

  return await res.json();
};

/**
 * Verify NPS Payment & Create/Confirm Order
 */
export const verifyNPSTransaction = async (
  merchantTxnId: string,
  customerName?: string,
  customerPhone?: string,
): Promise<NPSVerifyResponse> => {
  let url = `${BASE_API_URL}/nps/verify/?merchant_txn_id=${encodeURIComponent(
    merchantTxnId,
  )}&franchise=${franchise}`;
  if (customerName) {
    url += `&customer_name=${encodeURIComponent(customerName)}`;
  }
  if (customerPhone) {
    url += `&customer_phone=${encodeURIComponent(customerPhone)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        errorData.message ||
        "Failed to verify payment status",
    );
  }

  return await res.json();
};

export interface NPSStatusResponse {
  is_enabled: boolean;
  franchise: string;
}

/**
 * Check NPS configuration status for current franchise
 */
export const getNPSStatus = async (): Promise<NPSStatusResponse> => {
  try {
    const res = await fetch(`${BASE_API_URL}/nps/status/?franchise=${franchise}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { is_enabled: false, franchise: String(franchise) };
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to check NPS status:", error);
    return { is_enabled: false, franchise: String(franchise) };
  }
};
