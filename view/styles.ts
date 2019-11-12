import {create as createJss} from 'jss'
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginDefaultUnit from 'jss-plugin-default-unit';
import jssPluginPropsSort from 'jss-plugin-props-sort';
import jssPluginGlobal from 'jss-plugin-global'

export const jss = createJss();
jss.use(jssPluginGlobal());
jss.use(jssPluginNested());
jss.use(jssPluginCamelCase());
jss.use(jssPluginDefaultUnit({}));
jss.use(jssPluginPropsSort());


