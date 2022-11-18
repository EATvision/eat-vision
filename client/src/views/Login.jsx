import {
  Alert,
  AlertTitle,
  Box, Button, FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Typography, useTheme,
} from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import VerificationInput from 'react-verification-input'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { v4 as uuidv4 } from 'uuid'
import { t } from 'i18next'
import { updateToken } from '../utils/token'

const NO_AUTH = true

function LoginPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [isPendingSendToNumber, setIsPendingSendToNumber] = React.useState(true)
  const [chosenChannel, setChosenChannel] = React.useState('sms')
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('')
  const [codeExpired, setCodeExpired] = React.useState(false)
  const [verificationCodeTimerKey, setVerificationCodeTimerKey] = React.useState('1')
  const [verificationCodeValue, setVerificationCodeValue] = React.useState('')
  const [verificationCodeError, setVerificationCodeError] = React.useState(null)
  const [verificationPhoneNumberError, setVerificationPhoneNumberError] = React.useState(null)

  const handleChangeChannel = (event, newChannel) => {
    setChosenChannel(newChannel)
  }

  const handleSubmitPhoneNumber = async () => {
    setCodeExpired(false)
    setVerificationCodeValue('')
    setVerificationCodeTimerKey(uuidv4())
    setVerificationPhoneNumberError(null)
    try {
      const res = await axios.post('/verify', { phoneNumber: phoneNumberValue, channel: chosenChannel })
      if (NO_AUTH) {
        if (res.status === 200) {
          const { token, exp } = res.data
          updateToken(token, exp)
          navigate(-1)
        }
      } else {
        setIsPendingSendToNumber(false)
      }
    } catch (error) {
      setVerificationPhoneNumberError(error)
    }
  }

  const handleSubmitCode = async () => {
    setVerificationCodeError(null)
    try {
      const res = await axios.post('/verify/code', { phoneNumber: phoneNumberValue, code: verificationCodeValue })
      if (res.status === 200) {
        const { token, exp } = res.data
        updateToken(token, exp)
        navigate(-1)
      }
    } catch (error) {
      setVerificationCodeError(error)
    }
  }

  const handleOnCompleteCodeTimer = () => {
    setCodeExpired(true)
    setVerificationCodeTimerKey(uuidv4())
  }

  const handleFixPhoneNumber = () => {
    setIsPendingSendToNumber(true)
    setCodeExpired(false)
    setVerificationCodeTimerKey(uuidv4())
    setVerificationCodeError(null)
    setVerificationCodeValue('')
  }

  return (
    <Box
      className="App"
      sx={{
        position: 'relative',
        flexDirection: 'column',
        height: '100vh',
        display: 'flex',

      }}
    >
      <Typography variant="h3" sx={{ marginTop: theme.spacing(2) }}>Login</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >

        {
          isPendingSendToNumber
            ? (
              <Box
                sx={{
                  width: '80%',
                  maxWidth: 300,
                }}
              >
                <FormControl
                  fullWidth
                  sx={{ maxWidth: 300, direction: 'ltr' }}
                >
                  <FormLabel>Enter phone number</FormLabel>
                  <MuiTelInput
                    defaultCountry="IL"
                    value={phoneNumberValue}
                    onChange={setPhoneNumberValue}
                  />
                </FormControl>

                {
                  !NO_AUTH
                && (
                  <ToggleButtonGroup
                    fullWidth
                    color="primary"
                    exclusive
                    value={chosenChannel}
                    onChange={handleChangeChannel}
                    aria-label="channel"
                  >
                    <ToggleButton value="sms">SMS</ToggleButton>
                    <ToggleButton value="call">call</ToggleButton>
                  </ToggleButtonGroup>
                )
                }

                <Button
                  fullWidth
                  disabled={phoneNumberValue.length < 6}
                  onClick={handleSubmitPhoneNumber}
                  variant="contained"
                  sx={{ marginTop: theme.spacing(1), maxWidth: 500 }}
                >
                  {NO_AUTH ? t('next') : t('send')}
                </Button>
              </Box>
            )
            : (
              <Box
                sx={{
                  width: '80%',
                  maxWidth: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">{phoneNumberValue}</Typography>

                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FormLabel>Verification Code</FormLabel>
                  <VerificationInput
                    validChars="0-9"
                    inputProps={{ type: 'tel' }}
                    value={verificationCodeValue}
                    onChange={setVerificationCodeValue}
                    autoFocus
                  />
                </FormControl>

                <Button
                  fullWidth
                  disabled={verificationCodeValue.length < 6 || codeExpired}
                  variant="contained"
                  onClick={handleSubmitCode}
                  sx={{ marginTop: theme.spacing(1), maxWidth: 300 }}
                >
                  {t('continue')}

                </Button>

                <Box
                  sx={{
                    marginTop: theme.spacing(2),
                    height: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >

                  {
                    codeExpired
                      ? (
                        <>
                          <Typography>{'Haven\'t received the code?'}</Typography>
                          <Typography color="primary" onClick={handleSubmitPhoneNumber}>send again</Typography>
                          <br />
                          <Typography>fix phone number? </Typography>
                          <Typography color="primary" onClick={handleFixPhoneNumber}>fix number</Typography>
                        </>
                      )
                      : (
                        <CountdownCircleTimer
                          key={verificationCodeTimerKey}
                          isPlaying
                          duration={30}
                          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                          colorsTime={[7, 5, 2, 0]}
                          onComplete={handleOnCompleteCodeTimer}
                        >
                          {
                            ({ remainingTime }) => (
                              <div>
                              Code expires in:
                                <br />
                                {remainingTime}
                              sec
                              </div>
                            )
                          }
                        </CountdownCircleTimer>
                      )
                  }
                </Box>
              </Box>
            )
        }

      </Box>

      {
        verificationPhoneNumberError
        && (
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              textAlign: 'start',
              width: '80%',
              maxWidth: 300,
              bottom: theme.spacing(1),
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <AlertTitle>Error</AlertTitle>
          Phone number Error —
            <strong>Try again!</strong>
          </Alert>
        )
      }

      {
        verificationCodeError
        && (
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              textAlign: 'start',
              width: '80%',
              maxWidth: 300,
              bottom: theme.spacing(1),
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <AlertTitle>Error</AlertTitle>
          Verification Code Error —
            <strong>Try again!</strong>
          </Alert>
        )
      }
    </Box>
  )
}

export default LoginPage
