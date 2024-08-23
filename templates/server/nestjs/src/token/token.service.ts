import { Injectable } from '@nestjs/common';
import { Token__factory, Token } from './contracts/typechain-types';
import {Provider, Wallet, JsonRpcProvider, ContractTransactionResponse} from 'ethers';

@Injectable()
export class TokenService {

  private provider: Provider;
  private signer: Wallet;
  private addr2: Wallet;
  private tokenFactory: Token__factory;
  private token: Token;

  constructor() {
    this.provider = new JsonRpcProvider(process.env.EVM_URL || 'http://127.0.0.1:8545/');
    this.signer = new Wallet(process.env.EVM_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', this.provider);
    this.addr2 = new Wallet(process.env.EVM_PRIVATE_KEY2 || '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', this.provider);
    this.tokenFactory = new Token__factory(this.signer);    
    this.token = this.tokenFactory.attach(process.env.EVM_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3') as Token;


  }

  async getTokenContract(): Promise<string> {
    return this.token.target as string;
  }

  async getTokenContractOwner(): Promise<string> {
    return this.token.owner();
  }

  async getBalance(): Promise<bigint> {   
    return this.token.balanceOf(this.signer);
  }

  async transfer(): Promise<ContractTransactionResponse>{
    return this.token.transfer(this.addr2, '10');
  }
}
