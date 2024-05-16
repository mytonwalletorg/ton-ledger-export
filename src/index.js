import { derivePath } from 'ed25519-hd-key';
import { mnemonicToSeed } from 'bip39';
import { keyPairFromSeed } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';

async function extractKeysFromLedgerMnemonic(mnemonic, index) {
  const seed = await mnemonicToSeed(mnemonic);
  const seedContainer = derivePath(`m/44'/607'/0'/0'/${index}'/0'`, seed.toString('hex'));
  const keyPair = keyPairFromSeed(seedContainer.key);
  const publicKey = keyPair.publicKey;
  const secretKey = keyPair.secretKey;
  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });
  const address = wallet.address.toString({ bounceable: false });
  const publicKeyHex = publicKey.toString('hex');
  const privateKeyHex = secretKey.toString('hex').slice(0, 64);

  return { address, publicKeyHex, privateKeyHex };
}

export {
  extractKeysFromLedgerMnemonic,
};
