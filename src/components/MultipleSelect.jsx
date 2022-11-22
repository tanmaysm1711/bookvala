import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import _without from "lodash/without";
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelect() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //       // On autofill we get a stringified value.
    //       typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        console.log("clicked delete");
        setPersonName((current) => _without(current, value));
    };

    return (
        <FormControl sx={{ m: 1, width: 'fit-content' }}>
            {/* <InputLabel>Name</InputLabel> */}
            <Select
                style={{
                    minWidth: '30vw',
                    width: 'fit-content',
                    maxWidth: '50vw'
                }}
                // labelId="demo-multiple-name-label"
                // id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                    <div style={{ 
                        display: "flex",
                        flexWrap: "wrap"
                    }}>
                        {(selected).map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                clickable
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                        style={{ color: '#FFF' }}
                                    />
                                }
                                // className={classes.chip}
                                style = {{
                                    margin: 2,
                                    backgroundColor: "#000",
                                    color: '#FFF'
                                }}
                                onDelete={(e) => handleDelete(e, value)}
                                onClick={() => console.log("clicked chip")}
                            />
                        ))}
                    </div>
                  )}
            >
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleSelect;