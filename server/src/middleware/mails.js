const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const oauth_link = "https://developers.google.com/oauthplayground";

const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECRET,
    oauth_link
);

let sendVertificationEmail = async (email, url) => {
    try {
        auth.setCredentials({
            refresh_token: MAILING_REFRESH
        });

        const accessToken = await auth.getAccessToken();
        
        if (!accessToken.token) {
            throw new Error('Failed to get access token');
        }

        const stmp = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL,
                clientId: MAILING_ID,
                clientSecret: MAILING_SECRET,
                refreshToken: MAILING_REFRESH,
                accessToken: accessToken.token,
            }
        });

        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: "Metabox email verification",
            html: `
                <div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:'Times New Roman',Times,serif;font-weight:600;color:#3b5998">
                    <img src alt style />
                    <span> Activate your account </span>
                </div>
                <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:'Times New Roman',Times,serif">
                    <span>Hello ${email}</span>
                    <div style="padding:1.5rem">
                        Please confirm your account
                    </div>
                    <a href="${url}" style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a>
                </div>
            `,
        };

        await stmp.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};

module.exports = sendVertificationEmail