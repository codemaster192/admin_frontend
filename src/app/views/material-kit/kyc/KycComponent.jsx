import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Modal,
    Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const KYCComponent = () => {
    const [kycData, setKycData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedKyc, setSelectedKyc] = useState(null);

    useEffect(() => {
        const fetchKycData = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace with your method of token storage
                const response = await axios.get('/kyc-submissions', {
                    headers: {
                        Authorization: token
                    }
                });

                setKycData(response.data.kycs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching KYC data", error);
                setLoading(false);
            }
        };

        fetchKycData();
    }, []);

    const updateStatus = (id, status) => {
        console.log(`Updating KYC ID ${id} to status ${status}`);
        // Add API call here to update KYC status if needed
    };

    const handleOpenModal = (kyc) => {
        setSelectedKyc(kyc);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedKyc(null);
    };

    if (loading) return <Typography>Loading KYC data...</Typography>;

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h4" gutterBottom>
                KYC Submissions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Birthday</TableCell>
                            <TableCell>ID Document</TableCell>
                            <TableCell>Proof of Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Submitted At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {kycData.map((kyc) => (
                            <TableRow key={kyc._id}>
                                <TableCell>{kyc.name}</TableCell>
                                <TableCell>{kyc.addressLine1}, {kyc.city}, {kyc.zipCode}</TableCell>
                                <TableCell>{new Date(kyc.birthday).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <a href={kyc.frontId} target="_blank" rel="noopener noreferrer">
                                        View ID Document
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={kyc.backId} target="_blank" rel="noopener noreferrer">
                                        View Proof of Address
                                    </a>
                                </TableCell>
                                <TableCell>{kyc.status}</TableCell>
                                <TableCell>{new Date(kyc.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="success"
                                        onClick={() => updateStatus(kyc._id, 'Approved')}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => updateStatus(kyc._id, 'Denied')}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenModal(kyc)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedKyc && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                KYC Details for {selectedKyc.name}
                            </Typography>
                            <Typography><strong>Address:</strong> {selectedKyc.addressLine1}, {selectedKyc.city}, {selectedKyc.zipCode}</Typography>
                            <Typography><strong>Birthday:</strong> {new Date(selectedKyc.birthday).toLocaleDateString()}</Typography>
                            <Typography>
                                <strong>ID Document:</strong> <a href={selectedKyc.frontId} target="_blank" rel="noopener noreferrer">View Document</a>
                            </Typography>
                            <Typography>
                                <strong>Proof of Address:</strong> <a href={selectedKyc.backId} target="_blank" rel="noopener noreferrer">View Document</a>
                            </Typography>
                            <Typography><strong>Status:</strong> {selectedKyc.status}</Typography>
                            <Typography><strong>Submitted At:</strong> {new Date(selectedKyc.createdAt).toLocaleDateString()}</Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Paper>
    );
};

export default KYCComponent;
