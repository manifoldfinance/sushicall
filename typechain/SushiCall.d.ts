/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface SushiCallInterface extends ethers.utils.Interface {
  functions: {
    "gasBase()": FunctionFragment;
    "gasLeft()": FunctionFragment;
    "gasLimit()": FunctionFragment;
    "getCurrentBlockTimestamp()": FunctionFragment;
    "getEthBalance(address)": FunctionFragment;
    "sushicall(tuple[])": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "gasBase", values?: undefined): string;
  encodeFunctionData(functionFragment: "gasLeft", values?: undefined): string;
  encodeFunctionData(functionFragment: "gasLimit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentBlockTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEthBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "sushicall",
    values: [{ target: string; gasLimit: BigNumberish; callData: BytesLike }[]]
  ): string;

  decodeFunctionResult(functionFragment: "gasBase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gasLeft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gasLimit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentBlockTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sushicall", data: BytesLike): Result;

  events: {};
}

export class SushiCall extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: SushiCallInterface;

  functions: {
    gasBase(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { ret: BigNumber }>;

    gasLeft(overrides?: CallOverrides): Promise<[BigNumber]>;

    gasLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { timestamp: BigNumber }>;

    getEthBalance(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    sushicall(
      calls: { target: string; gasLimit: BigNumberish; callData: BytesLike }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  gasBase(overrides?: CallOverrides): Promise<BigNumber>;

  gasLeft(overrides?: CallOverrides): Promise<BigNumber>;

  gasLimit(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  sushicall(
    calls: { target: string; gasLimit: BigNumberish; callData: BytesLike }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    gasBase(overrides?: CallOverrides): Promise<BigNumber>;

    gasLeft(overrides?: CallOverrides): Promise<BigNumber>;

    gasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    sushicall(
      calls: { target: string; gasLimit: BigNumberish; callData: BytesLike }[],
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        ([boolean, BigNumber, string] & {
          success: boolean;
          gasUsed: BigNumber;
          returnData: string;
        })[]
      ] & {
        blockNumber: BigNumber;
        returnData: ([boolean, BigNumber, string] & {
          success: boolean;
          gasUsed: BigNumber;
          returnData: string;
        })[];
      }
    >;
  };

  filters: {};

  estimateGas: {
    gasBase(overrides?: CallOverrides): Promise<BigNumber>;

    gasLeft(overrides?: CallOverrides): Promise<BigNumber>;

    gasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    sushicall(
      calls: { target: string; gasLimit: BigNumberish; callData: BytesLike }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    gasBase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gasLeft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gasLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEthBalance(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sushicall(
      calls: { target: string; gasLimit: BigNumberish; callData: BytesLike }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
