import fetch from 'isomorphic-fetch';

const SERVER_HOST = 'http://127.0.0.1:3000';

// create test form
(async function () {
  const template = {
    version: '0.0.0',
    title: '派对邀请',
    description: '关于周末派对，做一个小调查',
    form: [
      {
        type: 'ShortAnswer',
        id: '2',
        title: '总共有多少人一起参加？',
        required: true
      },
      {
        type: 'SingleSelection',
        id: '3',
        title: '总共有多少人一起参加？',
        choices: [{
          type: 'text',
          text: '123'
        }, {
          type: 'text',
          text: '123456'
        }, {
          type: 'text',
          text: '321'
        }, {
          type: 'other'
        }]
      },
      {
        type: 'TextField',
        id: 'text',
        title: '标题',
        description: '表单说明'
      },
      {
        type: 'ImageView',
        id: 'image',
        title: '图片标题'
      },
      {
        type: 'MultiSelection',
        id: '4',
        title: '总共有多少人一起参加？',
        choices: [{
          type: 'text',
          text: '123'
        }, {
          type: 'text',
          text: '123456'
        }, {
          type: 'text',
          text: '321'
        }, {
          type: 'other'
        }]
      }]
  };

  const date = new Date().toUTCString();

  const password = 'apple' + date;

  const RSAKey = require('../rsa/rsa2.js');

  const generatersa = new RSAKey();
  generatersa.generate(1024, '10001', password);
  const publickey = generatersa.n.toString(16);

  const jsondata = {
    publicKey: publickey,
    template: template,
    date: date
  };

  const data = JSON.stringify(jsondata)

  var hSig = generatersa.sign(data, 'sha256');

  const res = await fetch(SERVER_HOST + '/api/form', {
    method: 'POST',
    body: data,
    headers: {
      'content-type': 'application/json',
      'x-signature': hSig
    }
  });
  console.log(await res.text())
})()
