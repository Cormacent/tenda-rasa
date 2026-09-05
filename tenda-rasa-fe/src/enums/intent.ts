export enum Intent {
  GREETING = 'GREETING',
  ORDER_STATUS = 'ORDER_STATUS',
  ORDER_PAYMENT = 'ORDER_PAYMENT',
  RECOMMENDATION = 'RECOMMENDATION',
  EXPLANATION = 'EXPLANATION',
  CANCEL_ORDER = 'CANCEL_ORDER',
  COMPLAINT = 'COMPLAINT',
  HELP = 'HELP',
  GOODBYE = 'GOODBYE',
  CART_SUMMARY = 'CART_SUMMARY',
  CONFIRM_CHECKOUT = 'CONFIRM_CHECKOUT',
  USER = 'USER',
  OTHER = 'OTHER'
}
export const intentLabels: Record<Intent, string> = {
  [Intent.GREETING]: 'Greeting',
  [Intent.ORDER_STATUS]: 'Order Status',
  [Intent.ORDER_PAYMENT]: 'Order Payment',
  [Intent.RECOMMENDATION]: 'Recommendation',
  [Intent.EXPLANATION]: 'Explanation',
  [Intent.CANCEL_ORDER]: 'Cancel Order',
  [Intent.COMPLAINT]: 'Complaint',
  [Intent.HELP]: 'Help',
  [Intent.GOODBYE]: 'Goodbye',
  [Intent.CART_SUMMARY]: 'Cart Summary',
  [Intent.CONFIRM_CHECKOUT]: 'Confirm Checkout',
  [Intent.USER]: 'User',
  [Intent.OTHER]: 'Other'
};