import { SendMailOptions } from "nodemailer";
import { createTransport } from "../server/transport";

type MailContent = {
    subject: SendMailOptions['subject'],
    to: SendMailOptions['to'],
    from: SendMailOptions['from']
    text: SendMailOptions['text']
    html: SendMailOptions['html']
    attachments?: SendMailOptions['attachments'],
    replyTo: SendMailOptions['replyTo'],
}

export async function sendEmail(body: MailContent) {
    const transport = createTransport()
    const info = await transport.sendMail(body)
    return info.accepted ? info.messageId : false
}