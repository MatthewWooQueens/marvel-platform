import { forwardRef, useRef, useState } from 'react';

import { FileUploadOutlined, InsertDriveFileOutlined, DescriptionOutlined, OndemandVideoOutlined, LanguageOutlined, Watch } from '@mui/icons-material';
import { Grid, IconButton, Button, Chip, Dialog, DialogContent, Typography, TextField, Autocomplete} from '@mui/material';

import { TextFieldElement, MultiSelectElement} from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a reusable input text field or file upload component with a required totle and an optional description
 * 
 * @returns 
 */
const TextFileInput = forwardRef((props,ref) => {
    const {
        id,
        name,
        placeholder,
        title,
        setValue,
        description,
        control,
        error,
        validation,
        ...otherProps
    } = props;

    const [open,setOpen] = useState(false);
    const [coord, setCoord] = useState({x:0, y:0})
    const fileInputRef = useRef();
    const [files, setFiles] = useState([]);
    const [fileType, setFileType] = useState([])
    const [multiple,setMultiple] = useState(false)
    
    const urlInput = () => {
        return (
            <Grid>
                Hi
            </Grid>
        )
    }


    const handleEndIconClick = (e) => {
        setCoord({
            x:e.target.getBoundingClientRect().left - window.innerWidth/2 - 85,
            y:e.target.getBoundingClientRect().top - window.innerHeight/2 - 125
            })
        setOpen(true);
    };

    const handleFileSelection = (e) => {
        setMultiple(true)
        console.log(files)
        const selected = e.target.files;
        const fileArray = [...Array.from(files),...selected]
        setFiles(fileArray)
        setValue(name,fileArray)
        e.target.value=[]
    }

    const handleDelete = (ind) => {
        const newFileArray = files?.filter((file,curInd) => ind !== curInd)
        setFiles(newFileArray);
        setValue(name,newFileArray)
        if(newFileArray.length===0){
            setMultiple(false)
        }
        console.log(newFileArray)
        console.log(multiple)
    }
    
    const renderPlaceholder = (v) => {
        const arrayFiles = Array.from(files);
        console.log(files)
        return (
            <Grid {...styles.chipGroupProps}>
              {arrayFiles?.map((val,i) => {
                return (
                  <Chip
                    key={i}
                    label={val?.name}
                    onDelete={() => handleDelete(i)}
                    {...styles.chipProps}
                  />
                );
              })}
            </Grid>
          );
    }

    const handleFileInput = (ind) => {
        const types = ['.doc,.docx,.pdf,.pptx']
        setFileType(types[ind])
        fileInputRef.current.click()
    }

    const renderFileBox = () => {
        return (
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}
                hideBackdrop={true}
                {...styles.FileBox(coord)}
            >
                <DialogContent sx={{p:'15px',".MuiDialogContent-root":{top:100,left:50}}}>
                    <Grid {...styles.FileBoxProps}>
                        <Button onClick={()=>{handleFileInput(0)}} startIcon={<FileUploadOutlined/>} {...styles.buttonProps}>
                            {'Upload (pdf, doc, docx, pptx)'}
                        </Button>
                        <Button startIcon={<InsertDriveFileOutlined/>} {...styles.buttonProps}>
                            CSV File
                        </Button>
                        <Button startIcon={<DescriptionOutlined/>} {...styles.buttonProps}>
                            Google Sheets
                        </Button>
                        <Button startIcon={<OndemandVideoOutlined/>} {...styles.buttonProps}>
                            Youtube Video
                        </Button>
                        <Button startIcon={<LanguageOutlined/>} {...styles.buttonProps}>
                            Website
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }


    const renderEndIcon = () => {
        return (
            <IconButton
                onClick={handleEndIconClick}
            >
                <FileUploadOutlined
                    {...styles.endIcon}
                />
            </IconButton>
        )
    };

    const renderTextBox = () => {
        if (!multiple){
            return(
                <TextFieldElement
                        multiline
                        inputRef={ref}
                        maxRows={4}
                        fullWidth={true}
                        name={name}
                        error={error}
                        control={control}
                        FormHelperTextProps={styles.helperTextProps(true,error)}
                        InputProps={{
                            endAdornment:(
                                <>
                                    {renderEndIcon()}
                                </>
                            ),
                            sx: {
                                alignItems:"flex-start",
                                width:"100%",
                                '& .MuiOutlinedInput-notchedOutline': {border: 'none',},

                            }
                        }}
                        validation={validation}
                        {...styles.textBox}
                />
            )
        }
        return(
            <MultiSelectElement
                name={name}
                ref={ref}
                error={error}
                options={[]}
                renderValue={(value)=>renderPlaceholder(value)}
                fullWidth
                multiple
                control={control}
                displayEmpty
                endAdornment={renderEndIcon()}
                showChips
                formControlProps={{
                    disabled: true,
                }}
                sx={{mt: '10px',alignItems: 'flex-start',"& .MuiInputBase-root":{alignItems: 'flex-start', position:'relative', mt:'10px'}}}
                {...styles.textBox}
                
            
            />
        )
    }

    const renderLinkBox = () => {
        return (
            <Dialog
                hideBackdrop={false}>

            </Dialog>
        )
    }

    /*(value, getTagProps)=>value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    console.log(value)
                    return (
                      <Chip variant="outlined" label={option} key={key} {...styles.chipProps}/>
                    );
                  })*/

    /*<Autocomplete
                multiple={multiple}
                id={`${id}-label`}
                value={value}
                options={[]}
                freeSolo
                fullWidth
                clearOnBlur={false}
                renderInput={(params)=>{
                    {if(!multiple){
                        return(renderTextBox(params))
                    }
                    return(
                        <MultiSelectElement
                            name={name}
                            error={error}
                            options={[]}
                            
                        />
                    )
                }    
                }}
                renderTags={
                    (value, getTagProps)=>{
                        if (!Array.isArray(value)){
                            return 
                        }
                        return (
                            <Grid>
                                {value.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    console.log(option)
                                    return (
                                        <Chip variant="outlined" label={option.name} key={key} onDelete={()=>handleDelete(key)} {...styles.chipProps}/>
                                    );
                                })}
                            </Grid>
                        )
                    }
                }
                sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingRight: "10px!important",
                    },
                    mb:"10px"
                }}
                
            />*/
    return (
        <>
            {urlInput()}
            {renderTextBox()}
            {renderFileBox()}
            <input
                type='file'
                ref={fileInputRef}
                accept={fileType}
                onChange={handleFileSelection}
                style={{display:'none'}}
                multiple
            />
        </>
    )
});

export default TextFileInput;