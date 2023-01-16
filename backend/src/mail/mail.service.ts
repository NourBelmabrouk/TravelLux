import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../users/user.entity';

import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from "prom-client";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectMetric("http_request_total") public counter: Counter<string>
    ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://api:3000/users/confirm/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './templates/confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.username,
        url,
      },
    });
    this.counter.labels({route:"users", statusCode: "200"}).inc()
  }
}