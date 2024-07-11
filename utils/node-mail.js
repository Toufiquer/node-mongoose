/*
|-----------------------------------------
| setting up NodeMail for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

const nodemailer = require('nodemailer')
// const path = require('path')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.APP_USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

const mailOptions = {
  from: { name: 'Toufiquer Rahman', address: process.env.APP_USER_EMAIL },
  to: ['toufiquer.0@gmail.com'],
  subject: 'first mail',
  text: 'from text message',
  html: '<h1>Heading h1 </h1>',
  // attachments: [
  //   {
  //     filename: 'text.pdf',
  //     path: path.join(__dirname, 'text.pdf'),
  //     contentType: 'application/pdf',
  //   },
  //   {
  //     filename: 'sample.jpg',
  //     path: path.join(__dirname, 'sample.jpg'),
  //     contentType: 'image/jpg',
  //   },
  // ],
}

module.exports.sendMailByMailApp = async (mailOptions, user, pass) => {
  try {
    console.log('')
    console.log('process.env.APP_USER_EMAIL : ', process.env.APP_USER_EMAIL)
    console.log('process.env.APP_PASSWORD : ', process.env.APP_PASSWORD)
    console.log('')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        // you have to use hard code instance for user and pass.

        user: 'hard code email',
        pass: 'hard code pass',
      },
    })
    await transporter.sendMail(mailOptions)
    console.log('Sent mail successfully')
  } catch (error) {
    console.error('Error during sendMail', error)
  }
}

// video link: https://www.youtube.com/watch?v=QDIOBsMBEI0

// you have to use hard code instance for user and pass.

//  However, you need to allow less secure apps from your google account to send emails. Through this link.
// https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4PyFQlLwh4H9Il_KZ5ZOCDCZibEcN92j33DZN68wFf63GjWDYwpkQiNONyuseGfll_BZZ2F8WjfQ2MIBqc_lAxHuLMo6JK_zhq7hTilKtkkDJpsRmk
