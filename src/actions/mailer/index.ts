'use server'
import nodemailer from 'nodemailer'
export const onMailer = (email:string) => {
    const transporter =nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user: process.env.NODE_MAILER_EMAIL,
            pass:process.env.NODE_MAILER_GMAIL_APP_PASSWORD
        }
    })

    const mailOptions = {
        to: email,
        subject: 'Welcome to the chatbot',
        text: 'One of your customers on Corinna, just switched to realtime mode'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log('[onMailer]', err )
        } else {
            console.log('[onMailer]', info.response)
        }

    })


}