const express = require('express');
const router = express.Router();
const portfolioSchema = require('../schemas/schema');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

//Router 1: Add notes notes using: POST 'api/notes/addnotes' login required
router.post('/massage', [
    body('name', 'enter name').notEmpty(), //use express validator name is not empty
    body('email', 'enter a valid emails').isEmail(),
    body('subject', 'enter your subject').notEmpty(),
    body('massage', 'enter your massage').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjay892000@gmail.com',
            pass: 'rtydrpwvzcsafryw'
        }
    });
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { name, email, subject, massage } = req.body;
        const data = new portfolioSchema({ name, email, subject, massage });
        const saveData = await data.save();
        res.json(saveData);

        if (saveData) {
            const mailOptions = {
                from: "sanjay892000@gmail.com",
                to: email,
                subject: `Hello! ${name},Thank you For given your Precious time  `,
                html: `<!DOCTYPE html>
    <html>
    <head>
       <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        .container {
            padding: 20px 0px;
            background-color: #f9f9f9;
            border-radius: 5px;
            width: 100%;
            max-width: 600px;
            margin: auto;
        }

        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }

        .content {
            padding: 20px;
            background-color: white;
            border-radius: 0 0 5px 5px;
        }
        .cong{
            color: red;
            font-size: 1em;
        }

        .footer {
            text-align: center;
            padding: 10px 0px;
            font-size: 0.9em;
            color: #888;
        }
    </style>
   </head>

   <body>
    <div class="container">
        <div class="header">
            <h2>Welcome Sanjay's Portfolio</h2>
        </div>
        <div class="content">
            <p><strong class="cong">Hii! </strong>${name},</p>
            <p><strong>Your massage is</strong></p>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Subject: ${subject}</p>
            <p>Massage: ${massage}</p>
            <p>Thank ${name}<span style="font-size:15px;color:red;">&hearts;</span>
<br>
            for Given your Precious time to visit my Portfolio</p>
            <p>Best regards,</p>
            <p>Sanjay Singh</p>
        </div>
        <div class="footer">
            <p>&copy;2024 sanjay's portfolio. All rights reserved.</p>
        </div>
     </div>
   </body>
   </html>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return res.status(401).send("message not send");
                }
                else {
                    console.log('Message sent: %s', info.response);
                    return res.status(201).send("message send");
                }
            });
            const success = true;
            console.log(success)
        }
        else {
            console.log("massage not send")
        }


    } catch (error) {
        console.log(error)
    }
})

module.exports = router;