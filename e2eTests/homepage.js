module.exports = {
  'Demo test Google': function (client) {
    client
    .url('http://www.google.com')
    .waitForElementVisible('body', 1000)
    .assert.title('Google')
    .assert.visible('input[type=text]')
    .setValue('input[type=text]', 'rembrandt van rijn')
    .waitForElementVisible('button[name=btnG]', 5000)
    .click('button[name=btnG]')
    .pause(1000)
    .assert.containsText('div[class=srg] >div:nth-child(1) h3',
      'Rembrandt - Wikipedia')
    .end()
  }
}
