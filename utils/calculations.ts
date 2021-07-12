import BigNumber from 'bignumber.js';

export function toTokenAmount(amount: BigNumber | number | string, decimals: number): BigNumber {
  return new BigNumber(amount).div(new BigNumber(10).exponentiatedBy(decimals));
}

export function fromTokenAmount(amount: BigNumber, decimals: number) {
  return amount.times(new BigNumber(10).pow(new BigNumber(decimals)))
}