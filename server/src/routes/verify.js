const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env
const jwt = require('jsonwebtoken')
const express = require('express')
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const router = express.Router()

const TOKEN_EXPIRATION = 1000 * 60 * 60 * 3 // in ms = 3 hours

function generateAccessTokenData(data) {
  const exp = Date.now() + TOKEN_EXPIRATION
  return {
    exp,
    token: jwt.sign(
      {
        ...data,
        exp,
      },
      process.env.TOKEN_SECRET
    )
  }
}

router.post('/', async (req, res) => {
  const { body: { phoneNumber, channel = 'sms' } } = req
  // let verificationRequest
  try {
    // verificationRequest = await twilio.verify.services(TWILIO_SERVICE_SID)
    //   .verifications
    //   .create({ to: phoneNumber, channel });
  } catch (e) {
    return res.status(500).send(e)
  }

  // WHILE WITH NO AUTHENTICATION, WE USE THIS
  const tokenData = generateAccessTokenData({ phoneNumber })
  return res.send(tokenData)

  // return res.send(verificationRequest);
})

router.post('/code', async (req, res) => {
  const { code, phoneNumber } = req.body
  const errors = { wasValidated: true }

  try {
    // const verificationResult = await twilio.verify.services(TWILIO_SERVICE_SID)
    //   .verificationChecks
    //   .create({ code, to: phoneNumber });

    // if (verificationResult.status === 'approved') {
    const tokenData = generateAccessTokenData({ phoneNumber })
    return res.send(tokenData)
    // } else {
    //   return res.status(403)
    // }
  } catch (e) {
    return res.status(500).send(e)
  }
})

module.exports = router