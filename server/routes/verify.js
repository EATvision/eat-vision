const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const router = express.Router();

router.get('/', ensureLoggedIn(), async (req, res) => {
  const errors = { wasValidated: false };
  const channel = req.user.verificationMethod;
  try {
    const verificationRequest = await twilio.verify.services(TWILIO_SERVICE_SID)
      .verifications
      .create({ to: req.user.phoneNumber, channel });
  } catch (e) {
    return res.status(500).send(e);
  }

  return res.send({ title: 'Verify', user: req.user, errors });
});

router.post('/', ensureLoggedIn(), async (req, res) => {
  const { verificationCode: code } = req.body;
  let verificationResult;
  const errors = { wasValidated: true };

  try {
    verificationResult = await twilio.verify.services(TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ code, to: req.user.phoneNumber });
  } catch (e) {
    return res.status(500).send(e);
  }


  if (verificationResult.status === 'approved') {
    await req.user.save();
    return res.send(req.user);
  }

  errors.verificationCode = `Unable to verify code. status: ${verificationResult.status}`;
  return res.status(403).send({ title: 'Verify error', user: req.user, errors });
});

module.exports = router;