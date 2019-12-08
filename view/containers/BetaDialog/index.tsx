import React from 'react';
import { Styles } from 'jss';
import injectSheet, { WithStyles } from 'react-jss';
import Content from 'containers/BlogPage/Content';
import Dialog from 'components/Dialog';

const styles: Styles = {
  section: {
    padding: '6px 24px'
  },
  title: {
    fontSize: '1.5em'
  }
};

interface IBetaDialogProps {
  onClose?: () => void;
}

class BetaDialog extends React.PureComponent<IBetaDialogProps & WithStyles<typeof styles>> {
  render() {
    const {onClose, classes} = this.props;
    return <Dialog
      onClose={onClose}
      onSubmit={onClose}
      title='Beta 版本'
      submitLabel='确定'
    >
      <section className={classes.section}>
        <Content.h4>欢迎使用 The Form</Content.h4>
        <Content.p>
          目前本站还处于测试阶段，你可以看到还有很多不完善的地方。
          我们的目标是创建一个强大又好用的，尊重用户隐私的问卷系统。
        </Content.p>
        <Content.p>
          QQ群：985532641
        </Content.p>
        <Content.p>
          Telegram 群组：<Content.a href='https://t.me/theform'>@theform</Content.a>
        </Content.p>
      </section>
    </Dialog>
  }
}

export default injectSheet(styles)(BetaDialog);
