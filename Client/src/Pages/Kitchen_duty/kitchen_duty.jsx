// kitchen_duty.jsx
import React, { useState } from 'react';
import './kitchen_duty.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

const KitchenDuty = () => {
    const [formValues, setFormValues] = useState({
        firstStudentName: '',
        secondStudentName: '',
        thirdStudentName: '',
        fourthStudentName: '',
        fiveStudentName: '',
        firstStudentID: '',
        secondStudentID: '',
        thirdStudentID: '',
        fourthStudentID: '',
        fivethStudentID: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';

        switch (id) {
            case 'firstStudentName':
            case 'secondStudentName':
            case 'thirdStudentName':
            case 'fourthStudentName':
            case 'fiveStudentName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only letters and spaces are allowed.';
                }
                break;
            case 'firstStudentID':
            case 'secondStudentID':
            case 'thirdStudentID':
            case 'fourthStudentID':
            case 'fivethStudentID':
                if (/^[A-Z0-9]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only numbers and capital letters without spaces are allowed.';
                }
                break;
            default:
                setFormValues({ ...formValues, [id]: value });
                break;
        }

        setErrors({ ...errors, [id]: error });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/kitchen_duty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
    
            const result = await response.json();
            console.log('Kitchen duty data saved successfully:', result);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };
    
    return (
        <div>
            <Head />
            <div className='kitchen_duty-big-rect3'>
                <div>
                    <h2 className='kitchen_duty-top-head3'>Student Kitchen Duty!</h2>
                </div>
                <div className='kitchen_duty-rect3'>
                    <div>
                        <h2 className='kitchen_duty-sub-top-head3'>Add student for kitchen duty!</h2>
                    </div>
                    <div className='xs-kitchen_duty-rect3'>
                        <div className='xs-kitchen_duty-sub3'>
                            {['firstStudentName', 'secondStudentName', 'thirdStudentName', 'fourthStudentName', 'fiveStudentName'].map((field, index) => (
                                <Box
                                    key={index}
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id={field}
                                        label={`${field.replace(/([A-Z])/g, ' $1').replace('Name', ' Name')}`}
                                        variant="standard"
                                        value={formValues[field]}
                                        onChange={handleInputChange}
                                        error={Boolean(errors[field])}
                                        helperText={errors[field]}
                                    />
                                </Box>
                            ))}
                        </div>
                        <div className='xs-kitchen_duty-sub3'>
                            {['firstStudentID', 'secondStudentID', 'thirdStudentID', 'fourthStudentID', 'fivethStudentID'].map((field, index) => (
                                <Box
                                    key={index}
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id={field}
                                        label={`${field.replace(/([A-Z])/g, ' $1').replace('ID', ' ID')}`}
                                        variant="standard"
                                        value={formValues[field]}
                                        onChange={handleInputChange}
                                        error={Boolean(errors[field])}
                                        helperText={errors[field]}
                                    />
                                </Box>
                            ))}
                        </div>
                    </div>
                    <div className='kitchen_duty-save-btn'>
                        <Stack direction="row" spacing={4}>
                            <Button
                                variant="contained"
                                endIcon={<SaveIcon />}
                                className='edit-btn-min'
                                style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KitchenDuty;
