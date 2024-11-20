"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
 
export default function WalletInfo() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
 
  const getAirdropOnClick = async () => {
    try {
      setIsLoading(true);
      if (!publicKey) {
        throw new Error("La wallet no está conectada");
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed",
      );
      if (sigResult) {
        alert("Airdrop confirmado!");
      }
      setIsLoading(false);
    } catch {
      alert("Tarifa de airdrop superada");
      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    try {
      if (!publicKey) {
        throw new Error("La wallet no está conectada");
      }
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
    } catch {
      alert("Error al obtener saldo");
    }
  };
 
  useEffect(() => {
    if (publicKey) {
     getBalance();
    }
  }, [publicKey, connection, balance]);


  return (
    <main className="flex flex-col items-center p-8 bg-green-300 rounded-lg shadow-md">
      {publicKey ? (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-black font-semibold text-2xl">Tu Wallet:</h1>
          <h2 className="text-black font-semibold">{publicKey?.toString()}</h2>
          <h2 className="text-black font-semibold">{balance} SOL</h2>
          <div className="flex justify-center gap-4" >
            <button
              onClick={getAirdropOnClick}
              disabled={isLoading}
              type="button"
              className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              { isLoading ? ("Obteniendo airdrop...") : ("Solicitar Airdrop")}
            </button>
            <button
              onClick={getBalance}
              type="button"
              className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400 "
            >
              Alctualizar Saldo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl text-center mt-5 mb-4 font-bold">Connecta tu wallet</h1>
            <WalletMultiButton style={{}} />
        </div>
      )}
    </main>
  );
}