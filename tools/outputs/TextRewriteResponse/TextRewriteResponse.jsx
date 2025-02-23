import {Grid} from '@mui/material'

import { useSelector } from 'react-redux';

import styles from './styles';

/**
 * TextRewrite component
 */
const TextRewriteResponse = () => {
    const { response } = useSelector((state) => state.tools);
    
    return (
        <Grid>Hi</Grid>
    )
}

export default TextRewriteResponse;