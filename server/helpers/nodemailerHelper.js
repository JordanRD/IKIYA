const
    nodeMailer = require('nodemailer'),
    nodeMailerPass='rxjyfxksjzrtypke',
    transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jordan.just.testing@gmail.com',
            pass: nodeMailerPass
        },
        tls: {
            rejectUnauthorized: true
        }
    })
    ;




module.exports = transporter