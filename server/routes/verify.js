const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const router = express.Router();

router.post('/', async (req, res) => {
  const { body: { phoneNumber, channel = 'sms' } } = req
  let verificationRequest
  try {
    verificationRequest = await twilio.verify.services(TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel });
  } catch (e) {
    return res.status(500).send(e);
  }

  return res.send(verificationRequest);
});

router.post('/code', async (req, res) => {
  const { code, phoneNumber } = req.body;
  let verificationResult;
  const errors = { wasValidated: true };

  try {
    verificationResult = await twilio.verify.services(TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ code, to: phoneNumber });
    return res.send(verificationResult)
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;