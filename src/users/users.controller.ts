import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
/* 
    It is a decorator, which is required to define a basic controller.
    @Controller() decorator allows us to easily group a set of related routes, and minimize repetitive code.
    We could specify the path prefix users in the @Controller() decorator so that we don't have to repeat that portion of the path for each route in the file.
*/
@Controller('users')
export class UsersController {
  /*
    The @Get() HTTP request method decorator before the findAll() method tells Nest to create a handler for a specific endpoint for HTTP requests.
    The endpoint corresponds to the HTTP request method (GET in this case) and the route path.
    What is the route path? The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the method's decorator. 
    Since we've declared a prefix for every route ( users), 
    and haven't added any path information in the decorator, Nest will map GET /users requests to this handler. 
    As mentioned, the path includes both the optional controller path prefix and any path string declared in the request method decorator
  */

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async indAll() {
    const data = await this.usersService.readTextToFile();
    return { 
      reply : { statusCode: HttpStatus.OK, result : data }
    };
  }

  @Get('byname/:name')
  @HttpCode(HttpStatus.OK)
  async findByName(@Param('name') name: string) {
    const data = await this.usersService.readByName(name);
    return { 
      reply: { statusCode: HttpStatus.OK, result : data },
    };
  }

  @Post('byname')
  @HttpCode(HttpStatus.OK)
  async AddByName(@Body() body : any) {
    const data = await this.usersService.writeTextToFile(body);
    return { 
      reply: { statusCode: HttpStatus.OK, result : data },
    };
  }
  @Delete('byname/:name')
  @HttpCode(HttpStatus.OK)
  async deleteByName(@Param('name') name: string) {
    const data = await this.usersService.deleteByName(name);
   
    return { 
      reply: { statusCode: HttpStatus.OK, result : data },
    };

  }
}
