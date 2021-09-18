/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  SushiSwapMulticall,
  SushiSwapMulticallInterface,
} from '../SushiSwapMulticall';

const _abi = [
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getEthBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'gasLimit',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SushiSwapMulticall.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'gasUsed',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SushiSwapMulticall.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b506109f8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630f28c97d146100465780631749e1e3146100645780634d2301cc14610095575b600080fd5b61004e6100c5565b60405161005b9190610697565b60405180910390f35b61007e600480360381019061007991906104c7565b6100cd565b60405161008c9291906106b2565b60405180910390f35b6100af60048036038101906100aa919061049a565b610280565b6040516100bc9190610697565b60405180910390f35b600042905090565b60006060439150825167ffffffffffffffff8111156100ef576100ee61095a565b5b60405190808252806020026020018201604052801561012857816020015b6101156102a1565b81526020019060019003908161010d5790505b50905060005b835181101561027a57600080600086848151811061014f5761014e61092b565b5b60200260200101516000015187858151811061016e5761016d61092b565b5b60200260200101516020015188868151811061018d5761018c61092b565b5b60200260200101516040015192509250925060005a90506000808573ffffffffffffffffffffffffffffffffffffffff1685856040516101cd9190610680565b60006040518083038160008787f1925050503d806000811461020b576040519150601f19603f3d011682016040523d82523d6000602084013e610210565b606091505b509150915060005a8461022391906107c4565b905060405180606001604052808415158152602001828152602001838152508989815181106102555761025461092b565b5b6020026020010181905250505050505050508080610272906108b3565b91505061012e565b50915091565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b604051806060016040528060001515815260200160008152602001606081525090565b60006102d76102d284610707565b6106e2565b905080838252602082019050828560208602820111156102fa576102f9610998565b5b60005b8581101561034857813567ffffffffffffffff8111156103205761031f610989565b5b80860161032d8982610405565b855260208501945060208401935050506001810190506102fd565b5050509392505050565b600061036561036084610733565b6106e2565b9050828152602081018484840111156103815761038061099d565b5b61038c848285610840565b509392505050565b6000813590506103a3816109bd565b92915050565b600082601f8301126103be576103bd610989565b5b81356103ce8482602086016102c4565b91505092915050565b600082601f8301126103ec576103eb610989565b5b81356103fc848260208601610352565b91505092915050565b60006060828403121561041b5761041a61098e565b5b61042560606106e2565b9050600061043584828501610394565b600083015250602061044984828501610485565b602083015250604082013567ffffffffffffffff81111561046d5761046c610993565b5b610479848285016103d7565b60408301525092915050565b600081359050610494816109d4565b92915050565b6000602082840312156104b0576104af6109a7565b5b60006104be84828501610394565b91505092915050565b6000602082840312156104dd576104dc6109a7565b5b600082013567ffffffffffffffff8111156104fb576104fa6109a2565b5b610507848285016103a9565b91505092915050565b600061051c8383610612565b905092915050565b600061052f82610774565b6105398185610797565b93508360208202850161054b85610764565b8060005b8581101561058757848403895281516105688582610510565b94506105738361078a565b925060208a0199505060018101905061054f565b50829750879550505050505092915050565b6105a28161080a565b82525050565b60006105b38261077f565b6105bd81856107a8565b93506105cd81856020860161084f565b6105d6816109ac565b840191505092915050565b60006105ec8261077f565b6105f681856107b9565b935061060681856020860161084f565b80840191505092915050565b600060608301600083015161062a6000860182610599565b50602083015161063d6020860182610662565b506040830151848203604086015261065582826105a8565b9150508091505092915050565b61066b81610836565b82525050565b61067a81610836565b82525050565b600061068c82846105e1565b915081905092915050565b60006020820190506106ac6000830184610671565b92915050565b60006040820190506106c76000830185610671565b81810360208301526106d98184610524565b90509392505050565b60006106ec6106fd565b90506106f88282610882565b919050565b6000604051905090565b600067ffffffffffffffff8211156107225761072161095a565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561074e5761074d61095a565b5b610757826109ac565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006107cf82610836565b91506107da83610836565b9250828210156107ed576107ec6108fc565b5b828203905092915050565b600061080382610816565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561086d578082015181840152602081019050610852565b8381111561087c576000848401525b50505050565b61088b826109ac565b810181811067ffffffffffffffff821117156108aa576108a961095a565b5b80604052505050565b60006108be82610836565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156108f1576108f06108fc565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6109c6816107f8565b81146109d157600080fd5b50565b6109dd81610836565b81146109e857600080fd5b5056fea164736f6c6343000807000a';

export class SushiSwapMulticall__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<SushiSwapMulticall> {
    return super.deploy(overrides || {}) as Promise<SushiSwapMulticall>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SushiSwapMulticall {
    return super.attach(address) as SushiSwapMulticall;
  }
  connect(signer: Signer): SushiSwapMulticall__factory {
    return super.connect(signer) as SushiSwapMulticall__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SushiSwapMulticallInterface {
    return new utils.Interface(_abi) as SushiSwapMulticallInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): SushiSwapMulticall {
    return new Contract(address, _abi, signerOrProvider) as SushiSwapMulticall;
  }
}