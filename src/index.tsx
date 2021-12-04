import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import '@fontsource/roboto';

const theme = responsiveFontSizes(createTheme());

const Component = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>hello world</div>
  </ThemeProvider>
);

ReactDOM.render(<Component />, document.getElementById('root'));
