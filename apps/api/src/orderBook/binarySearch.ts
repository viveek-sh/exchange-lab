export function insertPrice(
  prices: number[],
  price: number,
  ascending: boolean,
) {
  let left = 0;
  let right = prices.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    //@ts-ignore
    if (ascending ? prices[mid] < price : prices[mid] > price) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  if (prices[left] !== price) {
    prices.splice(left, 0, price);
  }
}
