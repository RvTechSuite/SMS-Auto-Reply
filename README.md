# Google Voice SMS Auto-Reply

Automatically reply to incoming Google Voice text messages when you're away — no coding skills required. Perfect for small business owners, RV technicians, and independent contractors who need a professional vacation or out-of-office response.

> **Forked from [Benmatic/SMS-Auto-Reply](https://github.com/Benmatic/SMS-Auto-Reply) and improved with additional features.**

---

## What's New in This Version

- **Phone number tracking** — replies only once per sender, even if they text multiple times and Gmail creates new threads each time
- **Auto self-destruct** — the trigger automatically deletes itself on your return date so you don't have to remember to turn it off
- **Auto memory reset** — clears the replied numbers list when it shuts down, so it's ready to go for your next vacation
- **1-minute trigger** — faster response time for business use

---

## How It Works

1. Someone texts your Google Voice number
2. Google Voice forwards the text to your Gmail as an email
3. Gmail labels it with your **SMS** label
4. The script runs every minute, finds the new email, and sends your auto-reply
5. It saves the sender's phone number so it never replies to the same person twice
6. On your return date, it deletes itself and resets automatically

---

## Setup Instructions

### Step 1 — Turn On Email Forwarding in Google Voice
1. Go to [voice.google.com](https://voice.google.com)
2. Click the gear icon (Settings) → Messages
3. Turn on **"Forward messages to email"**

### Step 2 — Create a Gmail Label and Filter
**Create the label:**
1. Go to [gmail.com](https://gmail.com)
2. In the left sidebar click **+ Create new label**
3. Name it exactly: `SMS`

**Create the filter:**
1. Click the filter icon in the Gmail search bar
2. In the **From** field enter: `voice-noreply@google.com`
3. Click **Create filter**
4. Check **Apply the label** and select **SMS**
5. Click **Create filter**

### Step 3 — Create a Sublabel (Optional but Recommended)
This gives you a visual log of everyone who texted while you were away.
1. In Gmail, hover over your SMS label in the sidebar
2. Click the three dots → **Add sublabel**
3. Name it `AutoResponse`

### Step 4 — Set Up Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click **+ New project**
3. Delete the default code
4. Copy and paste the entire contents of `code.gs` from this repo
5. Update these three variables at the top to match your situation:
