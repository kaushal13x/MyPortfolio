# EmailJS Setup Guide

To make the contact form actually send emails to your inbox, follow these steps:

## 1. Sign up for EmailJS
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Create a free account
- Verify your email address

## 2. Create an Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Connect your email account
- Note down the **Service ID**

## 3. Create an Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template:

```
Subject: New Portfolio Contact: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

- Note down the **Template ID**

## 4. Get Your Public Key
- Go to "Account" → "API Keys"
- Copy your **Public Key**

## 5. Update the Contact Component
Replace the placeholder values in `src/components/Contact.tsx`:

```javascript
const result = await emailjs.send(
  'YOUR_SERVICE_ID',        // Replace with your actual Service ID
  'YOUR_TEMPLATE_ID',       // Replace with your actual Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: portfolioData.contact.email,
  },
  'YOUR_PUBLIC_KEY'         // Replace with your actual Public Key
);
```

## 6. Test the Form
- Fill out the contact form
- Submit it
- Check your email inbox for the message

## Alternative: Use Formspree (Easier Setup)
If EmailJS seems complex, you can use Formspree:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Replace the form action with your Formspree endpoint
5. Update the form to use Formspree's simple integration

## Important Notes:
- Free EmailJS plan allows 200 emails per month
- Free Formspree plan allows 50 submissions per month
- Both services are reliable and widely used
- Your email credentials are secure and not exposed in the code 