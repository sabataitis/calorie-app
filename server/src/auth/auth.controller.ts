import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('current')
  async current(@Request() req){
    return this.authService.current(req.user);
  }

}
