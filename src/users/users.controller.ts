import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getInfo(@Req() req: Request) {
    return this.usersService.findPublicInfoById(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me')
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(req.user['sub'], updateUserDto);
    return this.usersService.findPublicInfoById(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me')
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user['sub']);
  }
}
