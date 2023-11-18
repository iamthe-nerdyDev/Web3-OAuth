import { useState, useEffect } from "react";
import useSessionToken from "../useSessionToken";
import { address as contractAddress } from "../../contracts/contractAddress.json";
import { abi } from "../../contracts/OAuth.json";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

type userStruct = {
  user?: {
    address: string;
    username: string;
    image: string;
    emailAddress: string;
    bio: string;
    createdAt: number;
    updatedAt: number;
  };
  error?: string;
};

type User = {
  user: userStruct | undefined;
  isLoading: boolean;
};

const useUserInfo = (): User => {
  const [user, setUser] = useState<userStruct | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signer = useSigner();
  const sessionToken = useSessionToken();

  const getInfoFromToken = async (sessionToken: string) => {
    setIsLoading(true);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const result = await contract.fetchUserInfo(sessionToken);

      setUser({
        user: {
          address: result.owner,
          username: result.username,
          image: result.pfp,
          emailAddress: result.emailAddress,
          bio: result.bio,
          createdAt: Number(result.createdAt),
          updatedAt: Number(result.updatedAt),
        },
      });
    } catch (e: any) {
      console.error(e);

      setUser({ error: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionToken) getInfoFromToken(sessionToken);
  }, [sessionToken]);

  return { user, isLoading };
};

export default useUserInfo;
