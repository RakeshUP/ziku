import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

/**
 * get gas price from ETH station. (In GWei)
 * @param refetchIntervalSec refetch interval in seconds
 */
export const useGasPrice = (
  refetchIntervalSec: number,
): { fast: BigNumber; fastest: BigNumber; safeLow: BigNumber; average: BigNumber } => {
  const [fast, setFast] = useState(new BigNumber(0))
  const [fastest, setFastest] = useState(new BigNumber(0))
  const [safeLow, setSafeLow] = useState(new BigNumber(0))
  const [average, setAverage] = useState(new BigNumber(0))
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {

    async function update() {
      const response = await getGasPrice()

      // convert to gwei
      setFast(new BigNumber(response.fast).div(10))
      setFastest(new BigNumber(response.fastest).div(10))
      setSafeLow(new BigNumber(response.safeLow).div(10))
      setAverage(new BigNumber(response.average).div(10))
    }
    update()
    const id = setInterval(update, refetchIntervalSec * 1000)
    setIntervalId(id);

    // cleanup function: remove interval
    return () => {
      clearInterval(intervalId)
    }
  }, [refetchIntervalSec])

  return { fast, fastest, safeLow, average }
}

const getGasPrice = async (): Promise<{ fast: number; fastest: number; safeLow: number; average: number }> => {
  const url = 'https://ethgasstation.info/api/ethgasAPI.json?'
  const res = await fetch(url)
  return await res.json()
}
