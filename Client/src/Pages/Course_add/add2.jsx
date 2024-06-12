import React, { useState } from 'react';
import './add2.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const add2 = () => {
    const [values, setValues] = useState({
        courseId: '',
        courseName: '',
        moduleCoordinatorName: '',
        coordinatorPhoneNumber: '',
        noOfStudent: '',
        courseDuration: '',
        descriptionOfCourse: '',
    });

    const [errors, setErrors] = useState({
        courseId: '',
        courseName: '',
        moduleCoordinatorName: '',
        coordinatorPhoneNumber: '',
        noOfStudent: '',
        courseDuration: '',
        descriptionOfCourse: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        switch (name) {
            case 'courseId':
                if (/^[A-Z0-9]*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only numbers and capital letters without spaces are allowed.' });
                }
                break;
            case 'courseName':
            case 'moduleCoordinatorName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only letters and spaces are allowed.' });
                }
                break;
            case 'coordinatorPhoneNumber':
                if (/^\d*$/.test(value) && value.length <= 10) {
                    setErrors({ ...errors, [name]: value.length === 10 ? '' : 'Must be a 10-digit number.' });
                } else {
                    setErrors({ ...errors, [name]: 'Only 10-digit numbers are allowed.' });
                }
                break;
            case 'noOfStudent':
                if (/^\d*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only numbers are allowed.' });
                }
                break;
            case 'courseDuration':
                if (/^[A-Za-z0-9\s]*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only letters and numbers are allowed.' });
                }
                break;
            case 'descriptionOfCourse':
                setErrors({ ...errors, [name]: '' });
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/contact', values)
            .then(res => {
                setSnackbar({
                    open: true,
                    message: 'Course added successfully!',
                    severity: 'success',
                });
            })
            .catch(err => {
                setSnackbar({
                    open: true,
                    message: 'Failed to add course.',
                    severity: 'error',
                });
            });
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <Head />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%', fontSize: '20px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <div className='big-rect9'>
                <div>
                    <h2 className='top-head9'>Add Course!</h2>
                </div>
                <div className='std-info-rect9'>
                    <div>
                        <h2 className='add-top-head9'>Course Information!</h2>
                    </div>
                    <div className='xs-add-main-info-rect9'>
                        <div className='xs-add-sub9'>
                            <div>
                                <Box
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
                                        id="courseId"
                                        label="Course ID"
                                        variant="standard"
                                        value={courseId}
                                        onChange={handleCourseIdChange}
                                        error={Boolean(errors.courseId)}
                                        helperText={errors.courseId}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
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
                                        id="coordinatorPhoneNumber"
                                        label="Coordinator Phone Number"
                                        variant="standard"
                                        value={coordinatorPhoneNumber}
                                        onChange={handleCoordinatorPhoneNumberChange}
                                        error={Boolean(errors.coordinatorPhoneNumber)}
                                        helperText={errors.coordinatorPhoneNumber}
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub9'>
                            <div>
                                <Box
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
                                        id="courseName"
                                        label="Course Name"
                                        variant="standard"
                                        value={courseName}
                                        onChange={handleCourseNameChange}
                                        error={Boolean(errors.courseName)}
                                        helperText={errors.courseName}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
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
                                        id="noOfStudent"
                                        label="No Of Student"
                                        variant="standard"
                                        value={noOfStudent}
                                        onChange={handleNoOfStudentChange}
                                        error={Boolean(errors.noOfStudent)}
                                        helperText={errors.noOfStudent}
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub9'>
                            <div>
                                <Box
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
                                        id="moduleCoordinatorName"
                                        label="Module Coordinator Name"
                                        variant="standard"
                                        value={moduleCoordinatorName}
                                        onChange={handleModuleCoordinatorNameChange}
                                        error={Boolean(errors.moduleCoordinatorName)}
                                        helperText={errors.moduleCoordinatorName}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
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
                                        id="courseDuration"
                                        label="Course Duration"
                                        variant="standard"
                                        value={courseDuration}
                                        onChange={handleCourseDurationChange}
                                        error={Boolean(errors.courseDuration)}
                                        helperText={errors.courseDuration}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className='xs-add-des-info-rect9'>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    backgroundColor: 'rgb(188, 187, 187)',
                                    borderRadius: 4,
                                    '& > :not(style)': { m: 1, width: '97%' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="descriptionOfCourse"
                                    label="Description Of Course"
                                    variant="standard"
                                    value={descriptionOfCourse}
                                    onChange={handleDescriptionChange}
                                />
                            </Box>
                        </div>
                    </div>
                    <div className='add-save-btn'>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
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
};

export default add2;
