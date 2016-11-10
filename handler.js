'use strict';

require('dotenv').config();

const cheerio = require('cheerio');
const querystring = require('querystring');
const rp = require('request-promise').defaults({
  jar: true,
  simple: false,
  transform: body => cheerio.load(body)
});

module.exports.handler = (event, context, callback) => {
  const config = {
    uri: 'https://www.packtpub.com/packt/offers/free-learning',
    login: {
      email: process.env.PACKT_USERNAME,
      password: process.env.PACKT_PASSWORD,
      op: 'Login',
      form_id: 'packt_user_login_form',
      form_build_id: ''
    }
  };
  const login_error = 'Sorry, you entered an invalid email address and password combination.';

  rp(config.uri)
    .then($ => {
      config.get_book_url = $('a.twelve-days-claim').attr('href');
      config.book_title = $('.dotd-title').text().trim();
      const form_id = $("input[type='hidden'][id^=form][value^=form]").val();
      if (form_id)
        config.login.form_build_id = form_id;

      return rp.post({
        uri: config.uri,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify(config.login)
      });
    })
    .then($ => {
      let login_failed = $(`div.error:contains('${login_error}')`);
      if (login_failed.length)
        return Promise.reject(new Error('Login failed. Please check your email address and password.'));
      return rp('https://www.packtpub.com' + config.get_book_url);
    })
    .then($ => {
      const msg = `Book Title: ${config.book_title}; Claim URL: https://www.packtpub.com${config.get_book_url}`;
      console.log(msg);
      return context.succeed();
    })
    .catch(context.fail);
};
