import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';
import Container from 'components/Container';
import ToolBar from 'components/ToolBar/ToolBar';
import ToolBarIcon from 'components/ToolBar/ToolBarIcon';
import Search from 'components/icons/Search';
import ToolBarText from 'components/ToolBar/ToolBarText';
import TextInput from 'components/Form/TextInput';
import ToolBarSpring from 'components/ToolBar/ToolBarSpring';
import ToolBarButton from 'components/ToolBar/ToolBarButton';
import Add from 'components/icons/Add';
import FormCard from 'components/FormCard';
import { IForm } from '@interface/Form';
import HomeAppBar from 'components/SiteAppBar';
import TextFooter from 'components/TextFooter';

const styles: Styles = {
  root: {
    background: '#e3f2fd',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  card: {
    position: 'relative',
    zIndex: 2,
    paddingRight: 32,
    paddingLeft: 32,
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: 32
  },
  main: {
    padding: '48px 32px',
  },
  toolbar: {
    minHeight: '56px',
    margin: '0 -32px',
    padding: '0 24px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#f5f5f5'
  },
  subtitle: {
    padding: '32px 0 16px',
    fontWeight: 600,
    color: 'rgba(0,0,0,.6)'
  },
  formList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: '-20px',
  },
  formListItem: {
    width: '20%',
    paddingBottom: '20px',
    paddingRight: '20px'
  },
  formCard: {
    width: '100%'
  },
  [`@media (max-width: 1400px)`]: {
    formListItem: {
      width: '25%',
    }
  },
  [`@media (max-width: 1100px)`]: {
    formListItem: {
      width: '33%',
    }
  },
  [`@media (max-width: 690px)`]: {
    formListItem: {
      width: '50%',
    },
    main: {
      padding: '0',
    },
    card: {
      paddingRight: 24,
      paddingLeft: 24,
      boxShadow: "none",
      borderRadius: '0px',
    }
  }
};

interface IPanelLayoutProps {
  onClickNewForm: React.MouseEventHandler;
  onDeleteForm: (id: string) => void;
  onSelectForm: (id: string) => void;
  onSearch: (search: string) => void;
  searchText: string;
  forms: IForm[];
}

const PanelLayout: React.SFC<IPanelLayoutProps & WithStyles<typeof styles>> = ({ onClickNewForm, onDeleteForm, onSelectForm, onSearch, searchText, forms, classes }) => (
  <div className={classnames(classes.root)}>
    <HomeAppBar />
    <main className={classes.main}>
      <Container className={classes.card}>
        <ToolBar className={classes.toolbar}>
          <ToolBarIcon icon={Search}></ToolBarIcon>
          <ToolBarText>
            <TextInput value={searchText} onChange={(e) => onSearch(e.target.value)} placeholder="搜索表单"></TextInput>
          </ToolBarText>
          <ToolBarSpring />
          <ToolBarButton onClick={onClickNewForm}><Add /> 创建新表单</ToolBarButton>
        </ToolBar>
        <h4 className={classes.subtitle}>{
          searchText ?
          '搜索: ' + searchText :
          '最近打开'
        }</h4>
        <div className={classes.formList}>
          {
            forms.map((form) =>
              <div key={form.id} className={classes.formListItem}>
                <FormCard
                  onDelete={() => onDeleteForm(form.id)}
                  onClick={() => onSelectForm(form.id)}
                  className={classes.formCard}
                  title={form.template.title}
                  subtitle={form.template.description}
                  date={form.date}
                />
              </div>
            )
          }
        </div>
      </Container>
      <TextFooter />
    </main>
  </div>
);

export default injectSheet(styles)(PanelLayout);
