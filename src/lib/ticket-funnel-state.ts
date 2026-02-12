const TICKETS_FLOW_KEY = "mynbala_tickets_flow_state";

export type TicketsFlowState = {
  branchId: string;
  tariffId: string;
  quantity: number;
  promoCode: string;
};

export function readTicketsFlowState(): TicketsFlowState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(TICKETS_FLOW_KEY);
    return raw ? (JSON.parse(raw) as TicketsFlowState) : null;
  } catch {
    return null;
  }
}

export function writeTicketsFlowState(state: TicketsFlowState) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(TICKETS_FLOW_KEY, JSON.stringify(state));
}

export function clearTicketsFlowState() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(TICKETS_FLOW_KEY);
}

