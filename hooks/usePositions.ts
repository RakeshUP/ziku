import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import { POSITIONS_QUERY } from '../queries/positionsQuery';
import { positions, positionsVariables, positions_account_balances } from '../queries/__generated__/positions';
import { useWallet } from "../context/wallet";

const usePositions = () => {
  const [positions, setPositions] = useState<Array<positions_account_balances>>([])

  const { address } = useWallet();
  const { data, loading } = useQuery<positions, positionsVariables>(POSITIONS_QUERY, { variables: { account: address }})

  useEffect(() => {
    if (!data?.account) return; 
    const _positions = data.account.balances.filter(position => {
      return position.balance !== '0' && position.token.expiryTimestamp >= Date.now() / 1000
    });
    setPositions(_positions)
  }, [loading])

  return { data, loading, positions };
};

export default usePositions;
