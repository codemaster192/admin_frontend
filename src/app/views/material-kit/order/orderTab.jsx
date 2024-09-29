import React, { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Switch,
    TextField,
    TablePagination,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

const OrdersTable = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // For storing filtered orders
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [page, setPage] = useState(0); // Pagination page state
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        // Fetch the data from API
        axios.get('/orders') 
            .then(response => {
                
                
                const transformedOrders = response.data.map(order => {
                    // Assuming you're interested in the first item's price for simplicity
                    const lineItem = order.line_items.length > 0 ? order.line_items[0] : null;
                    const price = lineItem && lineItem.price ? lineItem.price : 'No price available';
                
                    return {
                        externalId: order.order_id,
                        product: 'EightCap', // Static value
                        plan: order.order_name,
                        tradingAccount: '', // Empty for now
                        customer: `${order.customer.first_name} ${order.customer.last_name} (${order.customer.email})`,
                        createdTs: order.date_created,
                        lastUpdated: order.date_modified,
                        archived: order.archived,
                        orderId: order.order_id,
                        status: order.status,
                        price: price, // Updated to handle price from line_items
                    };
                });
                

                
                

                setOrders(transformedOrders);
                setFilteredOrders(transformedOrders); // Initialize filtered orders with the transformed list
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading orders", err);
                setLoading(false);
            });
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter orders based on search query
        const filtered = orders.filter(order =>
            order.product.toLowerCase().includes(query) ||
            order.orderId.toLowerCase().includes(query) ||
            order.customer.toLowerCase().includes(query) ||
            order.status.toLowerCase().includes(query)
        );
        setFilteredOrders(filtered);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 when rows per page changes
    };

    // Handle modal open/close
    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    

    const handleSave = () => {
        if (selectedOrder) {
          const updatedOrder = {
            ...selectedOrder,
            status: selectedOrder.status
          };
      
          axios.patch(`/${selectedOrder.orderId}/status`, updatedOrder)
            .then(response => {
              // Update the orders state with the updated order
              const updatedOrders = orders.map(order =>
                order.orderId === response.data.order.orderId ? response.data.order : order
              );
              setOrders(updatedOrders);
              handleCloseModal();
            })
            .catch(err => {
              console.error("Error updating order status", err);
              alert("Failed to update status");
            });
        }
      };

    // Handle copy functionality (e.g., copy the order ID)
    const handleCopy = (orderId) => {
        navigator.clipboard.writeText(orderId);
        alert(`Copied order ID: ${orderId}`);
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box>
                    <Typography variant="body1">Hide Archived</Typography>
                    <Switch />
                </Box>

                {/* Search bar */}
                <TextField
                    label="Search Orders"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by Product, Order ID, Customer, Status"
                    sx={{ mb: 2 }}
                />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="orders table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Archived</TableCell>
                                <TableCell>Order</TableCell>
                                <TableCell>External Id</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Trading Account</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created Ts</TableCell>
                                <TableCell>Last Updated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>
                                        <IconButton onClick={() => handleCopy(order.orderId)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenModal(order)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <input type="checkbox" checked={order.archived} readOnly />
                                    </TableCell>

                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.externalId}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell>{order.plan}</TableCell>
                                    <TableCell>{order.tradingAccount}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{new Date(order.createdTs).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(order.lastUpdated).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={filteredOrders.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableContainer>
            )}

            {/* Modal for editing order */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <>
                            <TextField
                                label="External Id"
                                value={selectedOrder.externalId}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={selectedOrder.status}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                                >
                                    <MenuItem value="error">Error</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="processing">Processing</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Price"
                                value={selectedOrder.price || 'N/A'}  // Display price or 'N/A' if no price available
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Created"
                                value={new Date(selectedOrder.createdTs).toLocaleDateString()}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Last Updated"
                                value={new Date(selectedOrder.lastUpdated).toLocaleDateString()}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <FormControl margin="normal">
                                <InputLabel>Archived</InputLabel>
                                <Switch
                                    checked={selectedOrder.archived}
                                    onChange={(e) => setSelectedOrder({ ...selectedOrder, archived: e.target.checked })}
                                />
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrdersTable;
