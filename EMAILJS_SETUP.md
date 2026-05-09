# EmailJS Setup for Contact Form

To enable email functionality for the contact form, you need to configure EmailJS:

## Steps to Set Up EmailJS

1. **Sign up for EmailJS**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account

2. **Create an Email Service**
   - Go to Email Services in your dashboard
   - Add a new email service (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account

3. **Create an Email Template**
   - Go to Email Templates
   - Create a new template
   - Use these variables in your template:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Message content
     - `{{to_email}}` - Your email (recipient)

4. **Get Your Credentials**
   - Copy your **Service ID** from Email Services
   - Copy your **Template ID** from Email Templates
   - Copy your **Public Key** from Account > General

5. **Configure Environment Variables**

   **For Local Development:**
   - Open or create the `.env` file in the `frontend` directory
   - Add your EmailJS credentials:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     VITE_EMAILJS_TO_EMAIL=your-email@example.com
     ```
   - Replace the placeholder values with your actual credentials
   - **Important**: Restart your development server after changing .env file

   **For Vercel Deployment:**
   - Go to your Vercel project dashboard
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar
   - Add the following environment variables:
     - `VITE_EMAILJS_SERVICE_ID` - Your Service ID
     - `VITE_EMAILJS_TEMPLATE_ID` - Your Template ID
     - `VITE_EMAILJS_PUBLIC_KEY` - Your Public Key
     - `VITE_EMAILJS_TO_EMAIL` - Your email address
   - Select **All** environments (Production, Preview, Development)
   - Click **Save**
   - **Important**: Redeploy your project after adding environment variables

## Example Template

Subject: `{{subject}}`

Body:
```
You received a new message from {{from_name}} ({{from_email}}):

{{message}}

---
Sent from SmartReads Contact Form
```

## Testing

After configuration, test the contact form by:
1. Filling out the form with test data
2. Clicking "Send Message"
3. Check your email inbox for the message

## Troubleshooting

- If emails aren't sending, check the EmailJS dashboard for error logs
- Ensure your email service is properly connected
- Verify your template variables match the code
- Check browser console for any JavaScript errors
