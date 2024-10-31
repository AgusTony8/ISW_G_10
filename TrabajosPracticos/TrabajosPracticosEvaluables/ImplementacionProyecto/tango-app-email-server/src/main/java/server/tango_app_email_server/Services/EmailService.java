package server.tango_app_email_server.Services;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.apache.tomcat.Jar;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import server.tango_app_email_server.Services.Dtos.EmailRequestDto;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender mailSender;

    public void sendTestEmail(String toEmail,
                              String subject,
                              String body) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("TangoApp");

        helper.setSubject(subject);
        helper.setText(body, false);
        mailSender.send(mimeMessage);
    }

    public void sendPublishEmail(EmailRequestDto emailRequestDto) throws MessagingException {

        BodyStringFormatter bodyStringFormatter = new BodyStringFormatter();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("TangoApp");
        mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailRequestDto.getToEmail()));
        helper.setSubject(emailRequestDto.getSubject());
        helper.setText(bodyStringFormatter.bodyToString(emailRequestDto.getBody()), false);
        mailSender.send(mimeMessage);
    }
}
