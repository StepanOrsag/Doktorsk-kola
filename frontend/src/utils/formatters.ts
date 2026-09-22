export const formatPaymentType = (type: string): string => {
  switch (type) {
    case 'FREE': return 'Zdarma';
    case 'PAID': return 'Placené';
    case 'AGREEMENT': return 'Dohodou';
    default: return type;
  }
};
