import nodeMailer from "nodemailer"

const __env__nodeMailerUser = process.env.NODEMAILER_USER || ""
const __env__nodeMailerPASS = process.env.NODEMAILER_PASS || ""
const __env__nodeMailerHOST = process.env.NODEMAILER_HOST || ""

export function createTransport () {
    const transport = nodeMailer.createTransport({auth: {user: __env__nodeMailerUser, pass: __env__nodeMailerPASS,}, service: __env__nodeMailerHOST})
    return transport
}

export function getEmailUser () {
    return __env__nodeMailerUser
}


