import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWallet } from '../context/wallet'
import BigNumber from 'bignumber.js'
import { ZX_EXCHANGE } from '../utils/address'
import abi from '../abis/erc20.json';

const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export function useUserAllowance(token: string) {
  const { web3, address, network, connected } = useWallet()

  const spenderAddess = useMemo(() => {
    return ZX_EXCHANGE[network]
  }, [network])

  const [allowance, setAllowance] = useState(new BigNumber(0))
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(true)

  const approve = useCallback(
    async (amount?: BigNumber) => {
      if (!web3 || !connected) return

      const erc = new web3.eth.Contract(abi as any, token)
      const approveAmount = MAX_UINT

      if (spenderAddess === '') throw new Error('Unkown Spender')

      await erc.methods.approve(spenderAddess, approveAmount).send({ from: address }).on('transactionHash', () => {})
      const newAllowance = await erc.methods.allowance(address, spenderAddess).call()
      setAllowance(new BigNumber(newAllowance.toString()))
    },
    [web3, token, address, spenderAddess],
  )

  useEffect(() => {
    if (address === '') return
    const erc = new web3.eth.Contract(abi as any, token)
    erc.methods
      .allowance(address, spenderAddess)
      .call()
      .then(allowance => {
        setAllowance(new BigNumber(allowance.toString()))
        setIsLoadingAllowance(false)
      })
      .catch(err => {
        setIsLoadingAllowance(false)
      })
  }, [web3, spenderAddess, token, address])

  return { allowance, isLoadingAllowance, approve }
}
