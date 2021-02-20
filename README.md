# Vonage Facebook Messenger Bot Workshop

Event: <https://www.meetup.com/Junior-Developers-Singapore/events/276101622/>

Sign up for a Vonage API account at https://dashboard.nexmo.com and use coupon code 21RDESJ for €10 of free credits. You’ll also need a Facebook account and Node.js for this workshop :) skip straight to it: https://dashboard.nexmo.com/coupons

1. Use Ngrok to run a test app on your local dev environment: `npx ngrok http 3000`
2. Create a new Vonage app here: https://dashboard.nexmo.com/applications
3. Turn on the Messages capability. Update the inbound and status URLs.
   - `https://<ngrok URL>/inbound`
   - `https://<ngrok URL>/status`
4. Add a Facebook Messenger sandbox app: https://dashboard.nexmo.com/messages/sandbox
5. Update the inbound and status webhook in the Sandbox app:
   - `https://<ngrok URL>/inbound`
   - `https://<ngrok URL>/status`
6. npm init -y
7. npm install express body-parser nedb @vonage/server-sdk@beta
8. Copy `env.sample` to `.env` and update the values.
9. Run the app with: `node index.js`

## Helpful Links

- Vonage Voyagers: <https://developer.nexmo.com/voyagers>
- Vonage tutorials: <https://learn.vonage.com>
- Community: <https://developer.nexmo.com/community/slack>
