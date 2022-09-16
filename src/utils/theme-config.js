export const Theme = {
    typography: {
      fontFamily: ["ProximaNovaAltLight-Regular"]
    },
    palette: {
      primary: {
        main: "#00ACF4",
        color:'#fff'
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
          color: "#00ACF4"
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