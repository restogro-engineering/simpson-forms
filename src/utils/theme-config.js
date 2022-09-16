export const Theme = {
    typography: {
      fontFamily: ["Roboto-Regular"]
    },
    palette: {
      primary: {
        main: "#306FFF"
      }
    },
    overrides: {
      MuiButton: {
        root: {
          // maxWidth: 300
        },
        containedPrimary: {
          color: "#fff"
        },
        text: {
          color: "#306FFF"
        }
      },
      MuiListItemIcon: {
        root: {
          minWidth: 30
        }
      },
      MuiTypography: {
        colorTextSecondary: {
          color: "#fff"
        }
      }
    }
  };