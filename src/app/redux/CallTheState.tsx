"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState, useAppSelector } from './store';
import { fetchProductData } from './features/ayncThunkApi';


const CallTheState = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useAppSelector((state: RootState) => state.products.productValue.products);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    // {children}
    <div className=""></div>
  );
};

export default CallTheState;
