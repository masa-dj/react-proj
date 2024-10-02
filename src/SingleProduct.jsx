import {React, useState} from 'react';
import { Box, Button, FormControl, Select, InputLabel, MenuItem, Container} from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


const ItemPic = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: 500,
    marginBottom: 20,
}));

const ItemText = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    height: 'auto',
    marginBottom: 20,
}));

const ReviewsText = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    marginBottom: 20,
}));

const fetchProduct = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching product');
    }
    return response.json();
};

const getIcon = (rating) => {
    switch (rating) {
        case 1: return <SentimentVeryDissatisfiedIcon color="error" />;
        case 2: return <SentimentDissatisfiedIcon color="warning" />;
        case 3: return <SentimentSatisfiedIcon color="warning" />;
        case 4: return <SentimentSatisfiedAltIcon color="success" />;
        case 5: return <SentimentVerySatisfiedIcon color="success" />;
        default: return null;
    }
};
function calcPrice(qty, price){
    return parseFloat((qty+0) * (price+0)).toFixed(2);
}

function retBrand(prod){
    if(prod) return prod;
    return "no brand";
}

function isLow(stock){
    if(stock==="Low Stock") return "Hurry up! This item is low in stock!";
    return;
}
export function SingleProduct() {
    const { id } = useParams();
    const { data: product, error, isLoading } = useQuery(['product', id], () => fetchProduct(id));
    const [quantity, setQuantity] = useState(product?.minimumOrderQuantity || 1);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching product: {error.message}</div>;
    if (quantity===1) setQuantity(product.minimumOrderQuantity);
    //console.log(product);
    const handleOrder = () => {
        alert(`Ordered ${quantity} of ${product.title}`);
    };
    //console.log(product.availabilityStatus);
    console.log(quantity);
    return (
        <main>
        <Box x={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>
            <Container sx={{ flexGrow: 1,  maxWidth: 'lg' }}>
            <h2>This is a single product</h2>
            <Grid container spacing={2}>
                <Grid item={true} xs={12} md={4}>
                    <ItemPic>
                        <Box
                            component="img"
                            sx={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'contain',
                                padding: 3
                            }}
                            alt={product.title}
                            src={product.images[0]}
                        />
                    </ItemPic>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ItemText>
                        <div>
                            {product.category}<br />
                            <p className='prodTitle'>{product.title}</p>
                            <strong>Brand:</strong> {retBrand(product.brand)}<br />
                            <strong>Price:</strong> {product.price} €<br />
                            <strong>Description:</strong> {product.description}<br />
                            <strong>Availability:</strong> {product.availabilityStatus}<br />
                            <strong>Warranty:</strong> {product.warrantyInformation}<br />
                            <strong>Return Policy:</strong> {product.returnPolicy}<br />
                            <strong>Min Order Quantity:</strong> {product.minimumOrderQuantity}<br />
                        </div>
                    </ItemText>
                    <div style={{ marginBottom: '5px' , alignItems: 'center', display: 'flex', justifyContent:'center'}}>
                        <FormControl variant="standard" size="small" sx={{ minWidth: 80, marginRight: 2, color:'palevioletred' }}>
                            <InputLabel>Quantity</InputLabel>
                            <Select
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                label="Quantity"
                            >
                                {Array.from({ length: 5 }, (_, index) => index + product.minimumOrderQuantity).map((qty) => (
                                    <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <p>Total price: </p> <strong >{calcPrice(quantity, product.price)} €</strong>
                        <Button
                            size="medium"
                            sx={{
                            marginLeft:2,
                            backgroundColor: 'palevioletred', color: 'white',
                            '&:hover': { backgroundColor: 'rgb(130, 56, 81)' }
                            }}
                            onClick={handleOrder}
                            >
                            Order
                        </Button>
                    </div>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <i>{isLow(product.availabilityStatus)}</i>
                    </div>
                    <ReviewsText>
                        <h3>Reviews</h3>
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px'
                                }}>
                                    {getIcon(review.rating)}
                                    <div style={{ marginLeft: '10px' }}>
                                        <strong>{review.reviewerName}</strong>: <i>{review.comment}</i>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No reviews available.</div>
                        )}
                    </ReviewsText>
                </Grid>
            </Grid>
            </Container>
        </Box>
        </main>
    );
}
