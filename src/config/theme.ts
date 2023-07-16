import { extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

const colors = {
  primary: "#1a365d",
  primaryAccent: "#ffffff",
};

const styles = {
  global: {
    "html, body": {
      height: "100%",
      bg: "gray.400",
    },

    "#__next": {
      height: "100%",
      bg: "gray.400",
    },
    "input::placeholder": {
      color: "white",
    },
    ".chakra-input": {
      background: "gray.500!important",
    },

    ".chakra-input button": {
      background: "gray.500!important",
      color: "white",
    },
    "*": {
      boxSizing: "border-box",
    },
  },
};

export const theme = extendTheme({
  colors,
  styles,
  components: {
    MultiSelect: {
      ...MultiSelectTheme,
      baseStyle: (props: any) => {
        const baseStyle = MultiSelectTheme.baseStyle(props) as any;
        return {
          ...baseStyle,
          list: {
            ...baseStyle.list,
            bg: "black",
            color: "white",
          },

          item: {
            ...baseStyle.item,
            _focus: {
              ...baseStyle.item._focus,
              bg: "dark.300",
            },
            _active: {
              ...baseStyle.item._active,
              bg: "orange.300",
            },
            _expanded: {
              ...baseStyle.item._expanded,
              bg: "dark.300",
            },
            _selected: {
              ...baseStyle.item._selected,
              bg: "dark.300",
            },
          },
          selectedItem: {
            ...baseStyle.selectedItem,
            variant: "solid",
            colorscheme: "dark.500",
          },
          button: {
            ...baseStyle.button,
            variant: "solid",
          },
        };
      },
    },
  },
});
