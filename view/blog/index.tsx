import React from 'react';
import Content from 'containers/BlogPage/Content';

const blog = {
  'why-theform': {
    title: '为什么要做 The Form ?',
    date: '2019年12月7日',
    auchor: 'by EYHN',
    content: <>
      <Content.p>目前市面上有很多问卷系统，比如国内有 腾讯问卷，国外有 Google Form，为什么我还要搭建 The Form？</Content.p>
      <Content.h3>我们不收集你的数据</Content.h3>
      <Content.p>
        很多免费问卷系统，都在收集你的数据。
      </Content.p>
      <Content.p>
        在大多数问卷系统中，你提交的问卷都是明文发送给后端，服务提供商可以随意读取你提交的数据。你所作的问卷调查都是在替腾讯，Google 这些公司收集数据。
      </Content.p>
      <Content.p>
        在 The Form 中填写的问卷会在浏览器中经过加密再发送到服务器。只有问卷创建时输入的密码才能解密数据。
        服务器无法读取问卷的内容，你的数据始终是你的隐私。
      </Content.p>
      <Content.img width='500px' figure title="表单创建时需要输入密码" src={require('./create-form.png')}></Content.img>
    </>
  }
}

export default blog;