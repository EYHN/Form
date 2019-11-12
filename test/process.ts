import crypto from '@eyhn/crypto';

// 模拟后端数据库
const serverdb = {} as any;

// --------------------------------------------------

{
  // 表单创建
  // 生成 rsa 公钥和私钥
  const {n: publickey, d: privatekey} = crypto.rsa.generate(1024, 10001);

  // 设置密码
  const password = 'hello1';

  const aeskey = crypto.pbkdf2.sha256(
    crypto.tools.textToArrayBuffer(password),
    crypto.tools.textToArrayBuffer('miku'),
    5000,
    32
  );

  // 使用密码加密 rsa 私钥
  const encryptedPrivatekey = crypto.aes.ctr.encrypt(
    aeskey,
    privatekey
  );

  const privateKeyMac = crypto.hmac.sha256(aeskey, privatekey);

  // 上传公钥和加密后的私钥
  serverdb.publickey = publickey;
  serverdb.encryptedPrivatekey = encryptedPrivatekey;
  serverdb.privateKeyMac = privateKeyMac;
}

// --------------------------------------------------

{
  // 提交表单
  // 生成 aes 密钥
  const aeskey = crypto.prng()(new Uint8Array(32));

  // 加密表单内容
  const formdata = 'abc';
  const encryptedFormdata = crypto.aes.ctr.encrypt(
    aeskey,
    crypto.tools.textToArrayBuffer(formdata)
  );

  // 加密 aes 密钥
  const encryptedAESkey = crypto.rsa.encrypt(aeskey, serverdb.publickey, 10001);

  // 上传加密后的表单内容和加密后的 aes 密钥
  serverdb.encryptedFormdata = encryptedFormdata;
  serverdb.encryptedAESkey = encryptedAESkey;
}

// --------------------------------------------------

{
  // 解密表单数据
  // 输入密码
  const password = 'hello';

  // 解密 rsa 密钥
  const privatekey = crypto.aes.ctr.decrypt(
    crypto.pbkdf2.sha256(
      crypto.tools.textToArrayBuffer(password),
      crypto.tools.textToArrayBuffer('miku'),
      5000,
      32
    ),
    serverdb.encryptedPrivatekey
  );

  // 解密 aes 密钥
  const aeskey = crypto.rsa.decrypt(privatekey, serverdb.publickey, serverdb.encryptedAESkey);

  // 解密表单内容
  const formdata = crypto.tools.arrayBufferToText(
    crypto.aes.ctr.decrypt(aeskey, serverdb.encryptedFormdata)
  );

  console.log(formdata === 'abc' ? 'success' : 'error')
}
