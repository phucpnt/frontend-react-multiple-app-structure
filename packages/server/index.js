require('dotenv').config({
  path: process.cwd() + `/.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
});

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const URL = require('url');
const fs = require('fs');
require('isomorphic-fetch');

const { PORT, MODULE_ROOT_PATH, CLIENT_ID, CLIENT_SECRET, COOKIE_NAME, API_LOGIN, LOGIN_URL } = require('./global-var');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/login', (req, res, next) => {
  if (!req.body.email) {
    res.status(404).json({ error: 'User Not Found' });
  } else {
    const buff64 = new Buffer(CLIENT_ID + ':' + CLIENT_SECRET);
    fetch(API_LOGIN, {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        grant_type: 'password',
        username: req.body.email,
        password: req.body.password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + buff64.toString('base64'),
      },
    })
      .then((response) => response.json().then((data) => ({ status: response.status, body: data })))
      .then(function (ress) {
        res.cookie(COOKIE_NAME, ress.body, {
          maxAge: ress.body.expires_in * 1000, // calculated in miliseconds
          domain: req.hostname,
          httpOnly: true,
        });
        res.status(ress.status).json({ message: 'successful' });
      })
      .catch((error) => {
        console.error(`request failed ${error}`);
        res.status(400).json({ error: 'The email or password you entered is incorrect' });
      });
  }
});

app.get('/logout', (req, res, next) => {
  res.clearCookie(COOKIE_NAME, {
    domain: req.hostname,
    httpOnly: true,
  });
  res.redirect(LOGIN_URL);
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login/permission-denied', (req, res) => {
  fs.readFile(path.join(MODULE_ROOT_PATH('login'), './index.html'), (err, content) => {
    if (err) {
      console.error('error missing file', MODULE_ROOT_PATH('login'), './index.html');
    }
    res.setHeader('content-type', 'text/html');
    const loginCookie = req.cookies[COOKIE_NAME] || {};
    let html = content.toString().replace('<head>', `<head><base href="/login/">`);
    html = injectReactAppVariables(html, {
      REACT_APP_apiAccessToken: loginCookie.access_token,
    });
    res.send(html);
  });
});

app.get('/login/:sub(forget|resetpassword)?', (req, res) => {
  const loginCookie = req.cookies[COOKIE_NAME];
  if (loginCookie && loginCookie.access_token) {
    res.redirect('/company');
    return;
  }
  fs.readFile(path.join(MODULE_ROOT_PATH('login'), './index.html'), (err, content) => {
    if (err) {
      console.error('error missing file', MODULE_ROOT_PATH('login'), './index.html');
    }
    res.setHeader('content-type', 'text/html');
    let html = content.toString().replace('<head>', `<head><base href="/login/">`);
    html = injectReactAppVariables(html);
    res.send(html);
  });
});

function canAccessModule() {
  return async (req, res, next) => {
    const loginCookie = req.cookies[COOKIE_NAME];
    if (!loginCookie || !loginCookie.access_token) {
      res.redirect('/login?to=/' + req.params.module);
      return;
    }

    const module = req.params.module;
    const apiUrl = URL.parse(API_LOGIN);

    const hostname = apiUrl.hostname;

    const mapping = {
      sub1: 'sub1',
      sub2: 'sub2',
    };
    if (['sub1', 'sub2'].indexOf(module) > -1) {
      const response = await fetch(`https://your-api.com/check-access/${mapping[module]}`, {
        headers: {
          Authorization: 'Bearer ' + loginCookie.access_token,
        },
      });
      if (!response.ok && response.status === 401) {
        res.redirect('/login/permission-denied#/' + module, 302);
      } else {
        next();
      }
    } else {
      next();
    }
  };
}

app.get('/:module(sub1|sub2)', canAccessModule(), (req, res) => {
  const loginCookie = req.cookies[COOKIE_NAME];
  if (!loginCookie || !loginCookie.access_token) {
    res.redirect('/login');
    return;
  }
  fs.readFile(path.join(MODULE_ROOT_PATH(req.params.module), './index.html'), (err, content) => {
    if (err) {
      console.error('error missing file', MODULE_ROOT_PATH(req.params.module), './index.html');
    }
    res.setHeader('content-type', 'text/html');
    let html = content.toString().replace('<head>', `<head><base href="/${req.params.module}/">`);
    // TEMPO UPDATE FOR INCLUDING THE accessotken, will be remove AFTER release/FRON-1177 release
    html = injectReactAppVariables(html, { REACT_APP_apiAccessToken: loginCookie.access_token });
    res.send(html);
  });
});

function injectReactAppVariables(html, jsVars = {}) {
  const envKeys = Object.keys(process.env).filter((key) => key.indexOf('REACT_APP') === 0);

  const jsDeclarations = envKeys
    .filter((k) => jsVars[k] === undefined)
    .map((key) => {
      return `var ${key} = "${process.env[key]}";`;
    });

  // TEMPO UPDATE FOR INCLUDING THE accessotken, will be remove AFTER release/FRON-1177 release
  for (let k in jsVars) {
    jsDeclarations.push(`var ${k} = ${JSON.stringify(jsVars[k])};`);
  }

  return html.replace('injecting_react_app_global_variables;', jsDeclarations.join('\n'));
}

app.use('/:module(sub1|sub2|login|static|vendors)', (req, res, next) => {
  express.static(MODULE_ROOT_PATH(req.params.module))(req, res, next);
});

app.listen(PORT, () => {
  console.info('Server started on', PORT);
});
