import {
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function PasswordField(props: any) {
    const flipVisibility = () => {
        props.setShowPassword(!props.showPassword)
    }
    return (
        <TextField 
            fullWidth
            variant="outlined"
            type={props.showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={flipVisibility}
                            onMouseDown={flipVisibility}
                        >
                            {props.showPassword ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    )
}