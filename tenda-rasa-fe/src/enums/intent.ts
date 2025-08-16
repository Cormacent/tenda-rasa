export enum Intent {
  GREETING = 'GREETING',
  ORDER_STATUS = 'ORDER_STATUS',
  ORDER_PAYMENT = 'ORDER_PAYMENT',
  RECOMMENDATION = 'RECOMMENDATION',
  EXPLANATION = 'EXPLANATION',
  USER = 'USER',
  OTHER = 'OTHER'
}
export const intentLabels: Record<Intent, string> = {
  [Intent.GREETING]: 'Greeting',
  [Intent.ORDER_STATUS]: 'Order Status',
  [Intent.ORDER_PAYMENT]: 'Order Payment',
  [Intent.RECOMMENDATION]: 'Recommendation',
  [Intent.EXPLANATION]: 'Explanation',
  [Intent.USER]: 'User',
  [Intent.OTHER]: 'Other'
};