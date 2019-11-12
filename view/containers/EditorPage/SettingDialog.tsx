import React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Selection from 'components/Form/Selection';
import ResponsivePanel from "components/ResponsivePanel";
import { Styles } from "jss";

interface ISettingDialogProps {
  onClose?: () => void;
}

const styles: Styles = {
  section: {
    padding: '12px 24px',
    borderBottom: '1px solid rgba(0,0,0,0.12)'
  },
  sectionHeader: {
    paddingTop: '16px',
    paddingBottom: '8px',
    fontSize: '15px'
  }
};

class SettingDialog extends React.PureComponent<ISettingDialogProps & WithStyles<typeof styles>> {
  render() {
    const { onClose, classes } = this.props;
    return <ResponsivePanel
      onClose={onClose}
      title='设置'
      submitLabel='保存'
    >
      <section className={classes.section}>
        <Selection type='checkbox'>
          收集电子邮件地址
        </Selection>
        <h5 className={classes.sectionHeader}>回复者可以：</h5>
        <Selection type='checkbox'>
          提交后编辑
        </Selection>
      </section>
    </ResponsivePanel>
  }
}

export default injectSheet(styles)(SettingDialog)