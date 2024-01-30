import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'teszt20020327@gmail.com',
        pass: 'sgyitkvbywsyjmmv',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'teszt20020327@gmail.com',
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
