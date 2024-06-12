import { Connection, clusterApiUrl } from '@solana/web3.js';
import { AnchorProvider } from '@project-serum/anchor';

const network = clusterApiUrl('devnet'); // Or your desired network
const connection = new Connection(network);

const getProvider = async () => {
  const provider = new AnchorProvider(
    connection,
    window.solana, // Assuming you'll connect with Phantom wallet
    AnchorProvider.defaultOptions()
  );
  return provider;
};

export { connection, getProvider };