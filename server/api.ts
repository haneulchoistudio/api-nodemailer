import type { NextApiRequest, NextApiResponse } from "next";
import type { FormData } from "../types";
import { sendEmail } from "./send";
import { getEmailUser } from "./utils"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).end()
        return
    }

    if (!req.body) {
        res.status(400).end()
        return
    }
    
    const sender = req.body as FormData

    const sent = await sendEmail({
        from: getEmailUser(),
        replyTo: getEmailUser(),
        to: sender.email,
        subject: `Email Arrived From ${sender.email}`,
        text: sender.message,
        html: `<div><p>${sender.message}</p></div>`,
        attachments: []
    })

    if (!sent) {
        res.status(500).end()
        return
    }

    res.status(200).end()


}