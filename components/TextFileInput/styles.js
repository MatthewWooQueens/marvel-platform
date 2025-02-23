import { Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";

const styles = {
    textBox: {
        fullWidth:true,
        sx: {
            whiteSpace: 'wrap',
            borderRadius: '15px',
            color: '#23252A',
            background: '#23252A',
            mt: 1,
            mb: '30px',
            fontFamily: 'Satoshi Regular',
            fontSize: { laptop: '12px', desktop: '14px' },
            fieldset: {
                border:'none',
                width:"100%",
            },
            
        },
    },

    endIcon: {
        sx: {color: '#9D74FF',
            variant: 'contained',
        }
    },

    FileBox: (coord)=>({
        sx: {color:'white',
            opacity:1,
            
            "& .MuiPaper-root":{background:'#000000' ,color: "#fff",borderRadius: '15px',border: 2,top:coord.y,left:coord.x},
            "& .MuiBackdrop-root":{backgroundColor: 'transparent'},
            "& .MuiDialog-root":{borderColor:'#AC92FF', width:'sm',}
            
        }
    }),
    FileBoxProps: {
        sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
        }
    },

    buttonProps: {
        sx:{
            color:'white',
            fontSize:'12px',
        }
    },
    placeholderProps: {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
        fontFamily: 'Satoshi Bold',
        sx: {
        opacity: 0.5,
        },
    },

    chipGroupProps: {
        sx:{marginLeft: '5px', marginRight: '5px', },
        container: true,
        item: true,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1,
      },

    chipProps: {
        fontFamily: 'Satoshi Regular',
        fontSize: '16px',
        sx: {
          color: 'black',
          background: 'grey',
        },
    },
    helperTextProps: (isDescription,error) => ({
        error,
        sx: {
            display: 'inline-block',
            lineHeight: '20px',
            hidden: !isDescription,
            fontFamily: 'Satoshi Regular',
            fontSize: { laptop: '12px', desktop: '14px' },
            color: (theme) => theme.palette.Common.Black['100p'],
            position:'absolute',
            top:'75px',
            width: '100%',
            mb:'20px'
        },
    }),
}

export default styles;