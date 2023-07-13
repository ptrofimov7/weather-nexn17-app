import { extendTheme } from '@chakra-ui/react';
import { MultiSelectTheme } from 'chakra-multiselect';

const colors = {
  primary: '#1a365d',
  primaryAccent: '#ffffff',
};

const styles = {
  global: {
    'html, body': {
      height: '100%',
      bg: 'gray.50',
    },

    '#__next': {
      height: '100%',
      bg: 'gray.50',
    },
  },
};

export const theme = extendTheme({
  colors, styles, components: {
    MultiSelect: {
      ...MultiSelectTheme,
      baseStyle: (props: any) => {
        const baseStyle = MultiSelectTheme.baseStyle(props) as any
        return {
          ...baseStyle,
        }
      },
    },
  }
});
