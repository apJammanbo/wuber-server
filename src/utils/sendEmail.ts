import MailGun from 'mailgun-js';

const mailGunClient = new MailGun({
	apiKey: process.env.MAILGUN_API_KEY || '',
	domain: 'sandboxa10184ee1779489f877541517632e7ce.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
	const emailData = {
		from: 'apjammanbo@gmail.com',
		to: 'apjammanbo@gmail.com',
		subject,
		html
	};
	console.log(sendEmail);
	return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
	const emailSubject = `Hello! ${fullName}, please verify your email`;
	const emailBody = `Verify your email by clicking <a href="http://nuber.com/verify/${key}/">Here</a>`;
	return sendEmail(emailSubject, emailBody);
};
