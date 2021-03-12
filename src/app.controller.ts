import { Controller, Get, Req, Res, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
// import { TurboStream } from 'express-hotwire/build/lib/hotwire-middleware';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  async getMessages(@Res() res: Response) {
    const message = await this.appService.getMessages();
    res.render('index', {
      message: message,
    });
  }

  @Post()
  // @Render('index') -- dont wanna render twice
  async postMessage(
    @Body() createMessageDto: CreateMessageDto, // figure out how to addteh Dto
    @Res() res: Response,
    @Req() req,
  ) {
    console.log('message in post', createMessageDto);

    // some code to the service
    const { id, content } = req.fields;

    const message = await this.appService.postMessage(id, content);

    res.turboStream.append(`message`, {
      partial: 'partials/show',
      locals: {
        message: message,
      },
    });
  }
}
