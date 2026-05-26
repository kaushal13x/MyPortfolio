# Formspree Setup Guide (Quick & Easy)

## Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create a New Form
1. After logging in, click "New Form"
2. Give your form a name (e.g., "Portfolio Contact")
3. Click "Create Form"

## Step 3: Get Your Form ID
1. You'll see a form endpoint like: `https://formspree.io/f/xaybzwkd`
2. Copy the form ID (the part after `/f/`): `xaybzwkd`

## Step 4: Update Your Code
Replace `YOUR_FORMSPREE_ID` in `src/components/Contact.tsx` with your actual form ID:

```javascript
const response = await fetch('https://formspree.io/f/xaybzwkd', {
  // Replace xaybzwkd with your actual form ID
```

## Step 5: Test
1. Fill out the contact form
2. Submit it
3. Check your email inbox - you'll receive the message!

## That's it! 
- No complex configuration needed
- Works immediately after setup
- Free plan includes 50 submissions per month
- All messages go directly to your email inbox

## Troubleshooting
- Make sure you've replaced `YOUR_FORMSPREE_ID` with your actual form ID
- Check your spam folder if you don't see emails
- Formspree sends a confirmation email to verify your email address 