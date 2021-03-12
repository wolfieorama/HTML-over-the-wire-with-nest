import { Injectable } from '@nestjs/common';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class AppService {
  private messages: Message[] = [];

  getMessages(): Message[] {
    return this.messages;
  }

  async postMessage(id, content): Promise<Message> {
    // const { id, content } = createMessageDto;-- need to deal with this

    const message: Message = {
      id: id,
      content: content,
    };

    this.messages.push(message);
    return message;
  }
}
