  
import { Provider } from '@ethersproject/providers';

interface SushiCallOptionsBase {
  sushicallContractAddress?: string;
  tryAggregate?: boolean;
  sushicallChainId: number;
}

export interface SushiCallOptionsWeb3 extends SushiCallOptionsBase {
  // so we can support any version of web3 typings
  // tslint:disable-next-line: no-any
  web3Instance: any;
}

export interface SushiCallOptionsEthers extends SushiCallOptionsBase {
  ethersProvider: Provider;
}

export interface SushiCallOptionsCustomJsonRpcProvider
  extends SushiCallOptionsBase {
  nodeUrl: string;
}
