import { Body, Controller, Delete, Param, Patch, Post,Request,UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { EnteredProductDomainName } from "./name.const";
import { UserProductDTO } from "../common/dto/userProduct.dto";
import { EnteredProductService } from "./entered-product.service";

@Controller(EnteredProductDomainName)
export class EnteredProductController{
  constructor(private enteredProductService: EnteredProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Request() req, @Body() payload: UserProductDTO){
    return this.enteredProductService.create(req.user.userId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: any): any{
    return this.enteredProductService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): any{
    return this.enteredProductService.delete(id);
  }

}
