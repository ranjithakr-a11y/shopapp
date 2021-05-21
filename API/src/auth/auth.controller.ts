import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt.guard";
import { UserService } from "./user/user.service";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "./entities/user.entity";
import { map, tap } from "rxjs/operators";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Post("login")
  @HttpCode(200)
  @ApiOkResponse({ description: "Login Successful" })
  @ApiBadRequestResponse({
    description: "User does not exists or invalid login details",
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  @ApiCreatedResponse({ description: "New user account created" })
  @ApiBadRequestResponse({
    description: "User already exists or server error",
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: any) {
    // user : userId, email : from JwtStrategy
    return this.userService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/profileimage",
        filename: (req: any, file: any, callback: any) => {
          return callback(null, `${uuidv4()}${file.originalname}`);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const user: UserEntity = req.user;

    console.log(file);

    return this.userService
      .updateOne(user.userId, { profileImage: file.filename })
      .pipe(
        tap((user: UserEntity) => console.log(user)),
        map((user: UserEntity) => ({ profileImage: user.profileImage }))
      );
  }

  @Get("profileImage/:fileId")
  async serveAvatar(@Param("fileId") fileId, @Res() res): Promise<any> {
    return res.sendFile(fileId, { root: "upload/profileImage" });
  }
}