import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface PolkadotWalletContextType {
  isConnected: boolean;
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  selectAccount: (account: InjectedAccountWithMeta) => void;
}

export interface PolkadotWalletProviderProps {
  children: React.ReactNode;
}
