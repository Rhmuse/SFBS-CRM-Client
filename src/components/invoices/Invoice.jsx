import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
import Utilities from '../../Utilities';
import autoTable from 'jspdf-autotable';

const Invoice = ({ invoice }) => {
	let orderId = 1;
	const [order, setOrder] = useState();
	const [customer, setCustomer] = useState();
	const [lineItems, setLineItems] = useState([]);

	const formatLineItem = (lineItem) => {
		const formatedLineItem = [
			`${lineItem.quantity}`,
			lineItem.product.name,
			`${formatter.format(lineItem.product.unitPrice)}`,
			`${formatter.format(lineItem.lineTotal)}`,
		];

		return formatedLineItem;
	};

	const formatter = Utilities.formatter;

	useEffect(() => {
		fetch(`http://localhost:8088/orders/${orderId}`)
			.then((res) => res.json())
			.then((order) => {
				setOrder(order);
				fetch(`http://localhost:8088/customers?id=${order.customerId}`)
					.then((res) => res.json())
					.then((customer) => {
						setCustomer(customer[0]);
					});
			});
		fetch(`http://localhost:8088/orderItems?orderId=${orderId}`)
			.then((res) => res.json())
			.then((items) => {
				fetch(`http://localhost:8088/products`)
					.then((res) => res.json())
					.then((products) => {
						const formatedLineItems = [];
						for (const item of items) {
							const foundProduct = products.find(
								(p) => p.id === item.productId
							);
							item.product = foundProduct;
							formatedLineItems.push(formatLineItem(item));
						}
						setLineItems(formatedLineItems);
					});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createInvoice = () => {
		const invoice = new jsPDF();

		// Create Title
		invoice.setFontSize(30);
		invoice.text('INVOICE', 20, 30);

		// Create address line
		invoice.setFontSize(20);
		invoice.text('Dunder Mifflin', 20, 45);
		invoice.setFontSize(12);
		invoice.text('Company Address', 20, 50);
		invoice.text('1725 Slough Ave.', 20, 55);
		invoice.text('Scranton, PA, 18540', 20, 60);
		invoice.text('Phone: 555-123-4444', 20, 65);

		// Add Logo
		const logo = new Image();
		logo.src =
			'https://dundermifflinincblog.files.wordpress.com/2017/03/black-dunder-mifflin.png';
		logo.onload = () => {
			invoice.addImage(logo, 'png', 150, 20);
			invoice.save(invoice.pdf);
		};

		// Add Invoice Number and Date
		invoice.text(`INVOICE #${order.id}`, 155, 60);
		invoice.text(`DATE: ${order.orderDate}`, 155, 65);

		//Bill to address
		invoice.text('BILL TO:', 20, 80);
		invoice.line(20, 81, 80, 81);
		invoice.text('Name', 20, 85);
		invoice.text('Company Name', 20, 90);
		invoice.text('Street address', 20, 95);
		invoice.text('city state', 20, 100);
		invoice.text('phone', 20, 105);

		//Ship to address
		invoice.text('SHIP TO:', 120, 80);
		invoice.line(120, 81, 190, 81);
		invoice.text('Name', 120, 85);
		invoice.text('Company Name', 120, 90);
		invoice.text('Street address', 120, 95);
		invoice.text('city state', 120, 100);
		invoice.text('phone', 120, 105);

		//Line Item Table

		const lineItemTableHeader = [
			'QUANTITY',
			'DESCRIPTION',
			'UNIT PRICE',
			'TOTAL',
		];

		const tableOptions = {
			startY: 120,
		};

		const tableTotals = [
			['', '', 'SUBTOTAL:', formatter.format(order.totalAmount)],
			['', '', 'SALES TAX:', 'tax'],
			['', '', 'TOTAL DUE:', formatter.format(order.totalAmount)],
		];

		const tableContents = [...lineItems, ...tableTotals];
		invoice.autoTable(lineItemTableHeader, tableContents, tableOptions);
	};

	if (lineItems.length > 0) {
		createInvoice();
	}

	return <>Invoice</>;
};

export default Invoice;
