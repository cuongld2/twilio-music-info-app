
import sgMail, { MailDataRequired } from '@sendgrid/mail';


function sendEmail(recipientEmail:string, htmlContent:string, mailSubject:string){

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
  const msg:MailDataRequired = {
    to: recipientEmail, // Change to your recipient
    from: process.env.SENDGRID_EMAIL!, // Change to your verified sender
    subject: mailSubject,
    html: htmlContent,
  }
  sgMail
    .send(msg)
    .then(() => {
    })
    .catch((error) => {
      console.error(error)
    })


}

export default function handler(req: { body?: any; method?: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  const { method } = req;

  if (method === 'POST') {
    const { email, mailContent } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
    }


  sendEmail(email, mailContent,`Successfully save Spotify links`)

    res.status(201).json({
      message: `Successfully sent email to ${email} to save Spotify links.`,
    });
  }
}
