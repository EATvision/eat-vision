const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const router = express.Router();

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