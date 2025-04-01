const formatPrice = (price: number): string => {
    const pounds = Math.floor(price / 100);
    const pence = price % 100;
    const formattedPence = pence.toString().padStart(2, '0');

    return `£${pounds}.${formattedPence}`;
};

export default formatPrice;
