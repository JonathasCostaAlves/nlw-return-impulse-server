import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "88367f5c08b336",
      pass: "174cf60fc0dfaa"
    }
  });

export class NodemailerAdapter implements MailAdapter{
    async sendMail ({subject, body}: SendMailData){
         await transport.sendMail({
        from:'Equipe Feedget <oi@feedget.com',
        to:"Jonathas Costa <jonathas@gmail.com",
        subject,
        html:body
    })

    }
}