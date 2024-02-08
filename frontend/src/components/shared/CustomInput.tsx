import { TextField } from '@mui/material';

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomInput = (props: Props) => {
    return (
        <TextField
            margin='normal'
            InputLabelProps={{
                style: {
                    color: '#FAF8F6',
                    fontSize: 20,
                    fontFamily: 'Playfair Display',
                },
            }}
            name={props.name}
            label={props.label}
            type={props.type}
            inputProps={{
                style: {
                    width: '400px',
                    borderRadius: 10,
                    fontSize: 20,
                    fontFamily: 'Lato',
                    color: '#FAF8F6',
                },
            }}
        />
    );
};

export default CustomInput;
