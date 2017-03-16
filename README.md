# azurebot

Translation bot built with the Microsoft bot framework, LUIS, and Google
translate.

### How it works

This uses the Microsoft Bot Framework as a front-end that connects to LUIS
(Language Understanding Intelligent Services) to transform conversational text
into commands and parameters (intent and entities) that are then passed to Google
translate.

You can test it out using Skype by clicking this ugly button 👉 <a href='https://join.skype.com/bot/f620617d-fdc2-47f2-8fe6-32fd6afb5b13'><img src='https://dev.botframework.com/Client/Images/Add-To-Skype-Buttons.png'/></a>

### Usage

Want to run this for yourself?

* Create a bot on the [Microsoft Bot Framework](https://dev.botframework.com/)
* Create a LUIS App in the [LUIS dashboard](https://www.luis.ai/)

Once you have those pieces, you'll need to train your LUIS app to recognize
utterances that relate to a `Translate` intent along with the following entities

* Text (_text to be translated_)
* FromLanguage (_language to translate from_)
* ToLanugage (_language to translate to_)

For example

> Translate hey girl from English to German

Maps to

`[$Translate] $[Text] from [$FromLanguage] to [$ToLanguage]`

---

Make sure to deploy your LUIS app and copy the keys for the bot and LUIS to
environment variables and you're set.
