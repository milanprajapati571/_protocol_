import React from 'react';
import { Button } from './ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { Link, useLocation } from 'react-router-dom';
import {} from '@/store/useAuthStore';

const Header = () => {
    const { authUser } = useAuthStore();
 
    return (
        <div className='p-2 shadow-sm flex justify-between items-center px-5'>
            <span className=' text-3xl '>Atom HR</span>
            <div>
                {authUser ? (
                    <div className='flex gap-4'>
                        <Button onClick={handleLogout}>Logout</Button>
                        {/*  logic here is that if i am on /my-trips page then dont show my trips button instead show +create-trip and i will make a handleCreateTripNavigation fn in useAuthStore just use it here  */}
                        <Button onClick={isMyTripsPage ? handleCreateTripNavigation : handleTripsNavigation}>
                            {isMyTripsPage ? '+ Create Trip' : 'My Trips'}
                        </Button>
                    </div>
                ) : (
                    <div className='flex gap-4'>
                        <Link to="/login">
                            <Button variant="outline" className="mr-2">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Signup</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;