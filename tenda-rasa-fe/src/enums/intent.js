export var Intent;
(function (Intent) {
    Intent["GREETING"] = "GREETING";
    Intent["ORDER_STATUS"] = "ORDER_STATUS";
    Intent["ORDER_PAYMENT"] = "ORDER_PAYMENT";
    Intent["RECOMMENDATION"] = "RECOMMENDATION";
    Intent["EXPLANATION"] = "EXPLANATION";
    Intent["USER"] = "USER";
    Intent["OTHER"] = "OTHER";
})(Intent || (Intent = {}));
export const intentLabels = {
    [Intent.GREETING]: 'Greeting',
    [Intent.ORDER_STATUS]: 'Order Status',
    [Intent.ORDER_PAYMENT]: 'Order Payment',
    [Intent.RECOMMENDATION]: 'Recommendation',
    [Intent.EXPLANATION]: 'Explanation',
    [Intent.USER]: 'User',
    [Intent.OTHER]: 'Other'
};
