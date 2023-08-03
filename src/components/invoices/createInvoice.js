import Utilities from '../../Utilities';
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { dmblacklogo } from './dmblacklogo';

const formatter = Utilities.moneyFormatter;

const formatLineItem = (lineItem) => {
    const formatedLineItem = [
        `${lineItem.quantity}`,
        lineItem.product.name,
        `${formatter.format(lineItem.product.unitPrice)}`,
        `${formatter.format(lineItem.lineTotal)}`,
    ];

    return formatedLineItem;
};


// function to encode file data to base64 encoded string
function base64_encode(file) {

}



export const createInvoice = (orderId) => {
    base64_encode('./imgs/black-dunder-mifflin.png')

    let order = {};
    let customer = {};
    let lineItems = []
    let user = {};

    fetch(`http://localhost:8088/orders/${orderId}`)
        .then((res) => res.json())
        .then((o) => {
            order = o;
            fetch(`http://localhost:8088/customers?id=${order.customerId}`)
                .then((res) => res.json())
                .then((c) => {
                    customer = c[0]
                    fetch(`http://localhost:8088/users?id=${customer.userId}`)
                        .then(res => res.json())
                        .then((u) => {
                            user = u[0];
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
                                            lineItems = (formatedLineItems);

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
                                            const logo = dmblacklogo;
                                            invoice.addImage(logo, 'png', 138, 6, 60, 60);

                                            // Add Invoice Number and Date
                                            invoice.text(`INVOICE #${order.id}`, 155, 60);
                                            invoice.text(`DATE: ${Utilities.dateFormatter(order.orderDate)}`, 155, 65);

                                            //Bill to address
                                            invoice.text('BILL TO:', 20, 80);
                                            invoice.line(20, 81, 80, 81);
                                            invoice.text(`${user.firstName} ${user.lastName}`, 20, 85);
                                            invoice.text(customer.companyName, 20, 90);
                                            invoice.text(customer.address, 20, 95);
                                            invoice.text('city state', 20, 100);
                                            invoice.text(customer.companyPhone, 20, 105);

                                            //Ship to address
                                            invoice.text('SHIP TO:', 120, 80);
                                            invoice.line(120, 81, 190, 81);
                                            invoice.text(`${user.firstName} ${user.lastName}`, 120, 85);
                                            invoice.text(customer.companyName, 120, 90);
                                            invoice.text(customer.address, 120, 95);
                                            invoice.text('city state', 120, 100);
                                            invoice.text(customer.companyPhone, 120, 105);

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

                                            invoice.save('invoice.pdf');
                                        });
                                });
                        })
                });
        });
}