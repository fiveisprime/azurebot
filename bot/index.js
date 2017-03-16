const BotBuilder = require('botbuilder')
const Translate = require('google-translate-api')

const client = require('LUISSDK')({
  appId: process.env.LUIS_APP_ID,
  appKey: process.env.LUIS_APP_KEY
})

let connector = module.exports = new BotBuilder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

let bot = new BotBuilder.UniversalBot(connector)

/**
 * Translates the specified text using the specified `to` and `from` values.
 * @param  {object} session The current bot session context.
 * @param  {string} text    Text to translate.
 * @param  {string} from    Beginning language.
 * @param  {string} to      Target language.
 */
function translateAndSend(session, text, from, to) {
  function sendReponse(response) {
    session.send(response.text || 'Something went wrong, try again.')
    session.endDialog()
  }

  if (from.length === 0 && to.length === 0) {
    Translate(text)
      .then(sendReponse.bind(null))
      .catch(sendReponse.bind(null))
  } else {
    Translate(text, { to: to })
      .then(sendReponse.bind(null))
      .catch(sendReponse.bind(null))
  }
}

bot.dialog('/clarify', [
  (session) => {
    BotBuilder.Prompts.text(session, 'I\'m sorry, what text do you want me to translate?')
  },
  (session, result, next) => {
    session.userData.translationText = result.response
    BotBuilder.Prompts.text(session, 'What language do you want me to translate this to?')
  },
  (session, result) => {
    translateAndSend(session, session.userData.translationText, '', result.response)
  }
])

bot.dialog('/', (session) => {
  client.predict(session.message.text, (err, res) => {
    let from = ''
    let to = ''
    let text = ''

    if (err || res.topScoringIntent.intent === 'None') return session.beginDialog('/clarify')

    if (res.topScoringIntent.intent === 'Translate text') {
      // Figure out what to translate to what.
      res.entities.forEach((e) => {
        if (e.type === 'ToLanguage') to = e.entity
        if (e.type === 'FromLanguage') from = e.entity
        if (e.type === 'Text') text = e.entity
      })

      if (text.length === 0) return session.beginDialog('/clarify')

      translateAndSend(session, text, from, to)
    }
  })
})
