import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { POLKADOT_NETWORK, STORAGE_KEY_SELECTED_ACCOUNT } from './constants';

// Check if we're running on the client side
export const isClient = typeof window !== 'undefined';

// Enable and get all available accounts from wallet extensions
export async function getAccounts(appName: string): Promise<InjectedAccountWithMeta[]> {
  if (!isClient) return [];

  try {
    // Dynamically import browser-only libraries
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

    const extensions = await web3Enable(appName);

    if (extensions.length === 0) {
      throw new Error('No web3 extension found. Please install Polkadot.js Extension.');
    }

    return await web3Accounts();
  } catch (error) {
    console.error('Error getting accounts:', error);
    return [];
  }
}

// Format address to display format
export function formatAddress(address: string, length = 4): string {
  if (!address) return '';
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

// Save selected account to localStorage
export function saveSelectedAccount(account: InjectedAccountWithMeta | null): void {
  if (!isClient) return;

  if (!account) {
    localStorage.removeItem(STORAGE_KEY_SELECTED_ACCOUNT);
    return;
  }

  localStorage.setItem(
    STORAGE_KEY_SELECTED_ACCOUNT,
    JSON.stringify({
      address: account.address,
      meta: account.meta,
    })
  );
}

// Get selected account from localStorage
export function getSelectedAccountFromStorage(): InjectedAccountWithMeta | null {
  if (!isClient) return null;

  const accountStr = localStorage.getItem(STORAGE_KEY_SELECTED_ACCOUNT);

  if (!accountStr) return null;

  try {
    return JSON.parse(accountStr) as InjectedAccountWithMeta;
  } catch (e) {
    return null;
  }
}

// Create Polkadot API instance
export async function createPolkadotApi(): Promise<ApiPromise> {
  const wsProvider = new WsProvider(POLKADOT_NETWORK.rpcURL);
  return await ApiPromise.create({ provider: wsProvider });
}
