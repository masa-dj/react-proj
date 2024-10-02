import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import { Login } from './Login';
import { Products } from './Products';
import { SingleProduct } from './SingleProduct';
import { NotFound } from './NotFound';
import { PictureLayout } from './PictureLayout';
import { BasicLayout } from './BasicLayout';
import './styles/app.scss';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Routes>
                    {/* Home, products, i single product isti layout (BasicLayout) */}
                    <Route element={<BasicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products">
                            <Route index element={<Products />} />
                            <Route path=":id" element={<SingleProduct />} />
                        </Route>
                    </Route>

                    {/* Register i Login isti, PictureLayout */}
                    <Route element={<PictureLayout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* 404 page not found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </QueryClientProvider>
        </>
    );
}

export default App;
