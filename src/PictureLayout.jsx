import { Outlet } from "react-router-dom"

export function PictureLayout(){
    return (
    <>
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 2, backgroundImage: 'url("src/images/dior.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ flex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Outlet />
            </div>
        </div>
    </>
    )
}