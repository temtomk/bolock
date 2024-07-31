import { Controller, Get,HttpException,HttpStatus,Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EthersError } from 'src/shared/ethers/types/EthersError';
import { TokenService } from './token.service';
import { ContractTransactionResponse } from 'ethers';


@Controller('token')
@ApiTags('token')
export class TokenController {

  constructor(
    private readonly tokentService: TokenService,
  ) {}

  @Get('/owner')
  async getLockContractOwner(): Promise<string> {
    try {
      return await this.tokentService.getTokenContractOwner();      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  
  @Get('/address')
  async getLockContractAddress(): Promise<string> {
    try {
      return await this.tokentService.getTokenContract()      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/balance')
  async getBalance(): Promise<bigint> {
    try {
      return await this.tokentService.getBalance();      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/transfer')
  async transfer(): Promise<ContractTransactionResponse> {
    try {
      return await this.tokentService.transfer();      
    } catch (error) { 
      const ethersErros = error as unknown as EthersError;      
      console.error(ethersErros.reason);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
