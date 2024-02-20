const nodeMailer=  require('nodemailer');
import * as SendGrid from 'nodemailer-sendgrid-transport';
import { getEnvironmentVariable } from '../environments/environment';
export class NodeMailer{
    static initiateTransport(){
       return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key:  getEnvironmentVariable().Sendgrid_api_key
            }
        }))
    };
    static async sendMail(data:{to: [String], subject: string, html:string}): Promise<any>{
        //console.log(getEnvironmentVariable().Sendgrid_api_key)
        return await  NodeMailer.initiateTransport().sendMail({
            from:"shruti4500@gmail.com",
            to: data.to,
            subject:data.subject,
            html:data.html
        });
    }
}