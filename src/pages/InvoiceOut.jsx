import React, { useContext } from "react";
import { InvoiceContext } from "./InvoiceContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import sign from "../img/signature.jpg";
import logo from "../img/logo.jpg";

const InvoiceOut = ({ data, onClose }) => {
	const { numberToWords } = useContext(InvoiceContext);

	const {
		companyLogo,
		sellerName,
		sellerAddress,
		panNumber,
		gstNumber,
		billingName,
		billingAddress,
		stateCode,
		orderNo,
		shippingName,
		shippingAddress,
		placeOfSupply,
		placeOfDelivery,
		orderDate,
		invoiceNo,
		invoiceDate,
		invoiceDetails,
		items = [],
		shippingCharges,
		shippingTaxRate,
		shippingTaxType,
		shippingTaxAmount,
		shippingTotalAmount,
		totalAmount,
		reverseCharge,
		signatureImage,
	} = data;

	const inWords = numberToWords(totalAmount);
	const totalTaxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);

	const styles = {
		overlay: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		modal: {
			position: "relative",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "white",
			padding: "20px",
			borderRadius: "8px",
			width: "60%",
		},
		closeButton: {
			position: "absolute",
			top: "10px",
			right: "-70px",
			background: "transparent",
			border: "1px solid red",
			fontSize: "20px",
			cursor: "pointer",
			color: "red",
			padding:"0.5rem"
		},
	};

	const downloadPDF = () => {
		html2canvas(document.querySelector(".container")).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const imgWidth = 210; // A4 width in mm
			const pageHeight = 295; // A4 height in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			let heightLeft = imgHeight;
			let position = 0;

			pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;

			while (heightLeft >= 0) {
				position -= pageHeight;
				pdf.addPage();
				pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
			}

			pdf.save("invoice.pdf");
		});
	};

	const handleModalClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div style={styles.overlay} onClick={onClose}>
			<div
				className='container'
				style={styles.modal}
				onClick={handleModalClick}>
				<button style={styles.closeButton} onClick={onClose}>
					close
				</button>
				<div className='header'>
					<img src={companyLogo || logo} alt='Company Logo' />
					<div className='invoice-title'>
						<h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
						<p>(Original for Recipient)</p>
					</div>
				</div>
				<div id='type'>
					<div id='right'>
						<p>
							<b>Billing Address:</b>
							<br />
							{billingName} <br />
							{billingAddress.split(",").map((part, index) => (
								<span key={index}>
									{part.trim()},
									<br />
								</span>
							))}
							<br />
						</p>
						<p>
							<b>State/UT Code:</b>
							{stateCode}
						</p>
						<p>
							<b>Shopping Address:</b>
							<br />
							{shippingName} <br />
							{shippingAddress.split(",").map((part, index) => (
								<span key={index}>
									{part.trim()},
									<br />
								</span>
							))}
						</p>
						<p>
							<b>State/UT Code:</b>
							{stateCode}
						</p>
						<p>
							<b>Place of Supply:</b>
							{placeOfSupply}
						</p>
						<p>
							<b>Place of Delivery:</b>
							{placeOfDelivery}
						</p>
						<p>
							<b>Invoice Number:</b>
							{invoiceNo}
						</p>
						<p>
							<b>Invoice Date:</b>
							{invoiceDate}
						</p>
						<p>
							<b>Invoice Details:</b>
							{invoiceDetails}
						</p>
					</div>
				</div>
				<div>
					<div id='left'>
						<p>
							<b>Sold By:</b> <br />
							{sellerAddress.split(",").map((part, index) => (
								<span key={index}>
									{part.trim()},
									<br />
								</span>
							))}
						</p>
						<p style={{ paddingTop: "10%" }}>
							<b>Pan No.</b>
							{panNumber}
						</p>
						<p>
							<b>GST Registration no.</b>
							{gstNumber}
						</p>
						<p style={{ paddingTop: "10%" }}>
							<b>Order Number:</b>
							{orderNo}
						</p>
						<p>
							<b>Order Date:</b>
							{orderDate}
						</p>
					</div>
				</div>
				<div>
					<table className='item-details'>
						<thead>
							<tr>
								<th>Sl. No</th>
								<th>Description</th>
								<th>Unit Price</th>
								<th>Qty</th>
								<th>Net Amount</th>
								<th>Tax Rate</th>
								<th>Tax Type</th>
								<th>Tax Amount</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.description}</td>
									<td>₹{item.unitPrice}</td>
									<td>{item.quantity}</td>
									<td>₹{item.netAmount}</td>
									<td>{item.taxRate}%</td>
									<td>{item.taxType}</td>
									<td>₹{item.taxAmount.toFixed(2)}</td>
									<td>₹{item.totalAmount.toFixed(2)}</td>
								</tr>
							))}
							<tr>
								<td colSpan='4'>Shipping Charges</td>
								<td>{shippingCharges}</td>
								<td>{shippingTaxRate}%</td>
								<td>{shippingTaxType}</td>
								<td>{shippingTaxAmount}</td>
								<td>{shippingTotalAmount}</td>
							</tr>
							<tr>
								<td colSpan='7' style={{ textAlign: "left" }}>
									<strong>TOTAL:</strong>
								</td>
								<th>₹{totalTaxAmount.toFixed(2)}</th>
								<th>₹{totalAmount.toFixed(2)}</th>
							</tr>
							<tr>
								<td colSpan='12'>
									<strong>Amount in Words: {inWords}</strong>
								</td>
							</tr>
							<tr>
								<td colSpan={12} style={{ textAlign: "right" }}>
									<strong>{sellerName}</strong> <br />
									<img
										src={signatureImage || sign}
										alt='signature '
										width='100px'
										height='100px'
									/>
									<br />
									<strong>Authorized Signatory</strong>
								</td>
							</tr>
						</tbody>
					</table>
					<p>Whether tax is payable under reverse charge - {reverseCharge}</p>
					<button type='button' onClick={downloadPDF}>
						Print PDF
					</button>
				</div>
			</div>
		</div>
	);
};

export default InvoiceOut;
