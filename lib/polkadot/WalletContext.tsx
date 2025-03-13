"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import {
  getAccounts,
  saveSelectedAccount,
  getSelectedAccountFromStorage,
  isClient
} from './utils';
import {
  PolkadotWalletContextType,
  PolkadotWalletProviderProps
} from './types';
import { ERROR_MESSAGES } from './constants';

// Create the context with default values
const PolkadotWalletContext = createContext<PolkadotWalletContextType>({
  isConnected: false,
  accounts: [],
  selectedAccount: null,
  connect: async () => {},
  disconnect: () => {},
  selectAccount: () => {},
});

export function PolkadotWalletProvider({ children }: PolkadotWalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize wallet connection from localStorage on component mount
  useEffect(() => {
    // Only run on client-side
    if (!isClient || isInitialized) return;

    const initializeWallet = async () => {
      try {
        // Check for previously selected account
        const savedAccount = getSelectedAccountFromStorage();

        if (savedAccount) {
          // Reconnect to wallet if we had a previously selected account
          await connect();
        }
      } catch (error) {
        console.error('Failed to initialize wallet', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeWallet();
  }, [isInitialized]);

  // Connect to wallet
  const connect = async () => {
    if (!isClient) return;

    try {
      const allAccounts = await getAccounts('TrustFund DAO');

      if (allAccounts.length === 0) {
        throw new Error('No accounts found. Please create an account in your Polkadot wallet extension.');
      }

      setAccounts(allAccounts);

      // If we have a previously selected account, try to find it in the current accounts
      const savedAccount = getSelectedAccountFromStorage();
      const matchingAccount = savedAccount
        ? allAccounts.find(acc => acc.address === savedAccount.address) || allAccounts[0]
        : allAccounts[0];

      selectAccount(matchingAccount);
      setIsConnected(true);

      return;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setIsConnected(false);
      setAccounts([]);
      setSelectedAccount(null);
      throw error;
    }
  };

  // Disconnect from wallet
  const disconnect = () => {
    setIsConnected(false);
    setSelectedAccount(null);
    saveSelectedAccount(null);
  };

  // Select a specific account
  const selectAccount = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
    saveSelectedAccount(account);
    setIsConnected(true);
  };

  return (
    <PolkadotWalletContext.Provider
      value={{
        isConnected,
        accounts,
        selectedAccount,
        connect,
        disconnect,
        selectAccount,
      }}
    >
      {children}
    </PolkadotWalletContext.Provider>
  );
}

// Hook to use the wallet context
export function usePolkadotWallet() {
  const context = useContext(PolkadotWalletContext);

  if (context === undefined) {
    throw new Error('usePolkadotWallet must be used within a PolkadotWalletProvider');
  }

  return context;
}
