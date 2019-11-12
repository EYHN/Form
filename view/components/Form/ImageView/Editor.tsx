import React from 'react';
import EditorItem from '../EditorItem';
import LegendEditor from '../LegendEditor';
import Delete from 'components/icons/Delete';
import IconButton from 'components/icons/IconButton';
import Tooltip from 'components/Tooltip';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';
import { IImageViewTemplate } from '@interface/Form/ImageView';

export interface IImageViewEditorProps {
  template: IImageViewTemplate;
  disabled?: boolean;
  onDelete?: () => void;
  onChange?: (value: IImageViewTemplate) => void;
}

const styles: Styles = {
  container: {
    position: 'relative',
    minHeight: '100px'
  },
  image: {
    display: 'block',
    width: '100%'
  },
  nativeInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
    cursor: 'pointer'
  },
  dragHandle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: '#fff',
    border: '3px dashed rgba(77, 144, 254, 0.5)',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transition: '125ms transform cubic-bezier(.4,0,.6,1), 125ms opacity cubic-bezier(.4,0,.6,1)',
    transform: 'scale(1)',
    'img + &': {
      opacity: 0
    },
    'img + &$draging': {
      opacity: 0.7
    },
  },
  disabledDragHandle: {
    borderColor: '#ccc'
  },
  dragHover: {
    transform: 'scale(1.02)'
  },
  draging: {
  }
}

interface IState {
  draging: boolean;
  hover: boolean;
}

class ImageViewEditor extends React.PureComponent<IImageViewEditorProps & WithStyles<typeof styles>, IState> {
  state: IState = {
    draging: false,
    hover: false
  };

  handleTitleChange = (title: string) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      title: title
    });
  }

  handleTypeChange = (type: string) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      type: type as any
    });
  }

  handleHover = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.type === "dragover") {
      this.setState({
        hover: true
      });
    } else {
      this.setState({
        hover: false
      });
    }
  }

  handleDraging = (event: DragEvent) => {
    if (event.type === "dragover") {
      this.setState({
        draging: true
      });
    } else {
      this.setState({
        draging: false
      });
    }
  }

  handleFile = (files: FileList) => {
    if (typeof this.props.onChange !== 'function') return;
    var reader = new FileReader();
    reader.addEventListener('load', (ev: any) => {
      this.props.onChange({
        ...this.props.template,
        url: ev.target.result as any
      });
    });
    const file = files[0];
    if (file.type.startsWith('image'))
    reader.readAsDataURL(files[0]);
  }

  handleUrl = (url: string) => {
    this.props.onChange({
      ...this.props.template,
      url: url
    });
  }

  handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files);
    } else if (event.dataTransfer.getData('url')) {
      this.handleUrl(event.dataTransfer.getData('url'));
    }
    
    this.setState({
      hover: false,
      draging: false
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0)
    this.handleFile(event.target.files);
  }

  componentDidMount() {
    window.addEventListener('dragover', this.handleDraging);
    window.addEventListener('dragleave', this.handleDraging);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.handleDraging);
    window.removeEventListener('dragleave', this.handleDraging);
  }

  render() {
    const { template, onDelete, classes, disabled } = this.props;

    return <EditorItem component='fieldset' disabled={disabled} toolbar={<>
      <Tooltip tip='删除' dir='bottom' disabled={disabled}><IconButton icon={Delete} onClick={onDelete} disabled={disabled} /></Tooltip>
    </>}>
      <LegendEditor title={template.title} onTitleChange={this.handleTitleChange} type={template.type} placeholder='图片标题' disabled={disabled} />
      <div className={classes.container} style={{height: !template.url && '300px'}}>
        {template.url && <img src={template.url} className={classes.image} />}
        <div
          id={this.props.template.id}
          className={classNames(classes.dragHandle, disabled && classes.disabledDragHandle, this.state.hover && !disabled && classes.dragHover, this.state.draging && classes.draging)}
          >
          点击此处上传图片<br/>
          &<br/>
          把图片拖到此处
          <input 
            className={classNames(classes.nativeInput)}
            type="file"
            onDragOver={this.handleHover}
            onDragLeave={this.handleHover}
            onDrop={this.handleDrop}
            onChange={this.handleInputChange}
            disabled={disabled}
            accept="image/*"
          />
        </div>
      </div>
    </EditorItem>
  }
}

export default injectSheet(styles)(ImageViewEditor);
