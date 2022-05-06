import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "../common/dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<Partial<UserDTO>> {
    const user = await this.usersService.findOne(username);
    if(user){
      const isMatch = await bcrypt.compare(pass, user.password);
      if(isMatch){
        const { password, ...result}=user;
        return result;
      }
      return null;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async current(req: any): Promise<any>{
      const user = await this.usersService.findById(req.userId);
      if(user){
        const {password, ...result} = user;
        return result;
      } else{
        throw new UnauthorizedException();
      }
  }
}
