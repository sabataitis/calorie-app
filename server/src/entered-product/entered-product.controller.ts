import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { EnteredProductDomainName } from "./name.const";
import { UserProductDTO } from "../common/dto/userProduct.dto";
import { EnteredProductService } from "./entered-product.service";

@Controller(EnteredProductDomainName)
export class EnteredProductController{
  constructor(private enteredProductService: EnteredProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() payload: UserProductDTO){
    return this.enteredProductService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: any): any{
    return this.enteredProductService.update(id, payload);
  }

}
