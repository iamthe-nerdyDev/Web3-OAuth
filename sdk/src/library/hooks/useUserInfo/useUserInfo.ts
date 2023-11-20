import { useState, useEffect } from "react";
import useSessionToken from "../useSessionToken";
import { address as contractAddress } from "../../contracts/contractAddress.json";
import { abi } from "../../contracts/OAuth.json";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

type userStruct = {
  address: string;
  username: string;
  image: string;
  emailAddress: string;
  bio: string;
  createdAt: number;
  updatedAt: number;
};

type User = {
  user: userStruct | undefined;
  error?: string;
  isLoading: boolean;
};

const useUserInfo = (): User => {
  const [user, setUser] = useState<userStruct | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const signer = useSigner();
  const [token, _] = useSessionToken();

  const getInfoFromToken = async (sessionToken: string) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.fetchUserInfo(sessionToken);

      setUser({
        address: result.owner,
        username: result.username,
        image: result.pfp,
        emailAddress: result.emailAddress,
        bio: result.bio,
        createdAt: Number(result.createdAt),
        updatedAt: Number(result.updatedAt),
      });
    } catch (e: any) {
      console.error(e);

      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token && signer) getInfoFromToken(token);
  }, [token, signer]);

  return { user, isLoading, error };
};

export default useUserInfo;
