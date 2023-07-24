import { createContext, useState } from 'react';
import OrderForm from './OrderForm';

export const OrderFormContext = createContext(null);

const OrderFormContainer = () => {
	const [orderItems, setOrderItems] = useState([]);

	return (
		<OrderFormContext.Provider value={{ orderItems, setOrderItems }}>
			<OrderForm />
		</OrderFormContext.Provider>
	);
};

export default OrderFormContainer;
