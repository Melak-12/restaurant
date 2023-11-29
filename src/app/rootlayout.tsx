import React from 'react';
import { useDispatch } from 'react-redux';
// import { fetchUserData } from '../actions';
import RootLayout from './RootLayout';

const ClientLayout: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <RootLayout />
  );
};

export default ClientLayout;
