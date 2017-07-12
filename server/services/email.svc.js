var helper = require('sendgrid').mail; //look in sendgrid. get .mail property
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY); //is an IFE, use ()

//service to send email..export so we can use elsewhere
exports.sendEmail = function(to, from, subject, content) {
    var fromEmail = new helper.Email(from); //creates a from in the form they expect with helper
    var toEmail = new helper.Email(to);
    var content = new helper.Content('text/html', content);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content); //creates email from all the variables
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
});
    return sg.API(request); //return is here and we can do .then when we import it other places