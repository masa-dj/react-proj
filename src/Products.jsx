import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useQuery } from 'react-query';

const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
        throw new Error('Error fetching products');
    }
    return response.json();
};
function retBrand(prod){
    if(prod) return prod;
    return "no brand";
}
function getCard(prod) {
    return (
        <Grid item={+true} xs={12} sm={6} md={4} lg={3} key={prod.id}>
            <Card sx={{ maxWidth: 200, marginBottom: 2 }}>
                <CardMedia
                component="img"
                height="170"
                image={prod.images[0]}
                alt={prod.title}
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        {prod.category}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black', display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 3,
                        height: '3em',
                        }}>
                        {prod.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {retBrand(prod.brand)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`${prod.price} €`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic'}}>
                        {prod.availabilityStatus}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        size="small"
                        sx={{
                        backgroundColor: 'palevioletred',
                        '&:hover': { backgroundColor: 'rgb(130, 56, 81)' }
                        }}>
                        <Link to={`/products/${prod.id}`} state={prod} style={{ textDecoration: 'none', color: 'white' }}>
                            Check
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export function Products() {
    const { data, error, isLoading } = useQuery('products', fetchProducts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products  {error.message}</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>
            <Container sx={{ flexGrow: 1,  maxWidth: 'lg' }}>
                <p>Products page</p>
                <Grid container spacing={2} justifyContent="center">
                    {data.products.map(prod => getCard(prod))}
                </Grid>
            </Container>
        </Box>
    );
}
