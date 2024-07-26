import React, { useContext, useEffect, useState } from "react";
import InvoiceOut from "./InvoiceOut";
import { InvoiceContext } from "./InvoiceContext";
import { fill } from "./PreData";

const InvoiceForm = () => {
	const { show, setShow, performCalculations } = useContext(InvoiceContext);
	const [data_true, setDataTrue] = useState(false);
	const [formData, setFormData] = useState({
		companyLogo: "",
		sellerName: "",
		sellerAddress: "",
		panNumber: "",
		gstNumber: "",
		placeOfSupply: "",
		billingName: "",
		billingAddress: "",
		stateCode: "",
		shippingName: "",
		shippingAddress: "",
		placeOfDelivery: "",
		orderNo: "",
		orderDate: "",
		invoiceNo: "",
		invoiceDate: "",
		invoiceDetails: "",
		reverseCharge: "No",
		items: [
			{
				description: "",
				unitPrice: 0,
				quantity: 0,
				discount: 0,
				taxRate: 0.18,
			},
		],
		signatureImage: "",
	});
	const [data, setData] = useState({});

	useEffect(() => {
		if (data_true) {
			setFormData({
				companyLogo: fill.companyLogo,
				sellerName: fill.sellerName,
				sellerAddress: fill.sellerAddress,
				panNumber: fill.panNumber,
				gstNumber: fill.gstNumber,
				placeOfSupply: fill.placeOfSupply,
				billingName: fill.billingName,
				billingAddress: fill.billingAddress,
				stateCode: fill.stateCode,
				shippingName: fill.shippingName,
				shippingAddress: fill.shippingAddress,
				placeOfDelivery: fill.placeOfDelivery,
				orderNo: fill.orderNo,
				orderDate: fill.orderDate,
				invoiceNo: fill.invoiceNo,
				invoiceDate: fill.invoiceDate,
				invoiceDetails: fill.invoiceDetails,
				reverseCharge: "No",
				items: fill.items.map((item) => ({
					description: item.description,
					unitPrice: item.unitPrice,
					quantity: item.quantity,
					discount: item.discount,
					taxRate: item.taxRate,
				})),
				signatureImage: fill.signatureImage,
			});
		} else {
			setFormData({
				companyLogo: "",
				sellerName: "",
				sellerAddress: "",
				panNumber: fill.panNumber,
				gstNumber: fill.gstNumber,
				placeOfSupply: "",
				billingName: "",
				billingAddress: "",
				stateCode: fill.stateCode,
				shippingName: "",
				shippingAddress: "",
				placeOfDelivery: "",
				orderNo: "",
				orderDate: "",
				invoiceNo: "",
				invoiceDate: "",
				invoiceDetails: fill.invoiceDetails,
				reverseCharge: "No",
				items: [
					{
						description: "",
						unitPrice: 0,
						quantity: 0,
						discount: 0,
						taxRate: 0.18,
					},
				],
				signatureImage: "",
			});
		}
	}, [data_true]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleItemChange = (index, e) => {
		const { name, value } = e.target;
		const updatedItems = [...formData.items];
		updatedItems[index][name] = value;
		setFormData({ ...formData, items: updatedItems });
	};

	const addItem = () => {
		setFormData({
			...formData,
			items: [
				...formData.items,
				{
					description: "",
					unitPrice: 0,
					quantity: 0,
					discount: 0,
					taxRate: 0.18,
				},
			],
		});
	};

	const removeItem = (index) => {
		const updatedItems = formData.items.filter((_, i) => i !== index);
		setFormData({ ...formData, items: updatedItems });
	};

	const handleImageChange = (e) => {
		const { name, files } = e.target;
		if (files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData({ ...formData, [name]: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const calculatedData = performCalculations(formData);
		setData(calculatedData);
		setShow(true);
	};

	return (
		<>
			<div className='invoice' style={{ boxShadow: show ? "none" : "" }}>
				<div className='invoice-header'>
					<h1>Invoice</h1>
				</div>
				<div style={{ display: show ? "none" : "block" }}>
					<label htmlFor='data'>set predefined data</label>
					<input type='checkbox' onChange={() => setDataTrue(!data_true)} />
					<form className='invoice-form' onSubmit={handleSubmit}>
						<label htmlFor={`item-logo`}>Company Logo</label>
						<input
							type='file'
							id='companyLogo'
							name='companyLogo'
							accept='image/*'
							onChange={handleImageChange}
						/>
						<br />
						<label htmlFor='sellerName'>Seller Name:</label>
						<input
							type='text'
							id='sellerName'
							name='sellerName'
							value={formData.sellerName}
							onChange={handleInputChange}
							placeholder='Enter seller Name'
							required
						/>
						<label htmlFor='sellerAddress'>Seller Address:</label>
						<input
							type='text'
							id='sellerAddress'
							name='sellerAddress'
							value={formData.sellerAddress}
							onChange={handleInputChange}
							placeholder='Enter seller address'
							required
						/>
						<label htmlFor='placeOfSupply'>Place of Supply:</label>
						<input
							type='text'
							id='placeOfSupply'
							name='placeOfSupply'
							value={formData.placeOfSupply}
							onChange={handleInputChange}
							placeholder='Enter place of supply'
							required
						/>
						<label htmlFor='billingName'>Billing Name:</label>
						<input
							type='text'
							id='billingName'
							name='billingName'
							value={formData.billingName}
							onChange={handleInputChange}
							placeholder='Enter billing name'
							required
						/>
						<label htmlFor='billingAddress'>Billing Address:</label>
						<input
							type='text'
							id='billingAddress'
							name='billingAddress'
							value={formData.billingAddress}
							onChange={handleInputChange}
							placeholder='Enter billing address'
							required
						/>

						<label htmlFor='shippingName'>Shipping Name:</label>
						<input
							type='text'
							id='shippingName'
							name='shippingName'
							value={formData.shippingName}
							onChange={handleInputChange}
							placeholder='Enter shipping name'
							required
						/>
						<label htmlFor='shippingAddress'>Shipping Address:</label>
						<input
							type='text'
							id='shippingAddress'
							name='shippingAddress'
							value={formData.shippingAddress}
							onChange={handleInputChange}
							placeholder='Enter shipping address'
							required
						/>
						<label htmlFor='placeOfDelivery'>Place of Delivery:</label>
						<input
							type='text'
							id='placeOfDelivery'
							name='placeOfDelivery'
							value={formData.placeOfDelivery}
							onChange={handleInputChange}
							placeholder='Enter place of delivery'
							required
						/>
						<label htmlFor='orderNo'>Order No:</label>
						<input
							type='text'
							id='orderNo'
							name='orderNo'
							value={formData.orderNo}
							onChange={handleInputChange}
							placeholder='Enter order no.'
							required
						/>
						<label htmlFor='orderDate'>Order Date:</label>
						<input
							type='date'
							id='orderDate'
							name='orderDate'
							value={formData.orderDate}
							onChange={handleInputChange}
							required
						/>
						<label htmlFor='invoiceDate' style={{ marginLeft: "50px" }}>
							Invoice Date:
						</label>
						<input
							type='date'
							id='invoiceDate'
							name='invoiceDate'
							value={formData.invoiceDate}
							onChange={handleInputChange}
							required
						/>
						<br />
						<label htmlFor='invoiceNo'>Invoice No:</label>
						<input
							type='text'
							id='invoiceNo'
							name='invoiceNo'
							value={formData.invoiceNo}
							onChange={handleInputChange}
							placeholder='Enter invoice no.'
							required
						/>
						<label htmlFor='reverseCharge'>Reverse Charge:</label>
						<select
							id='reverseCharge'
							name='reverseCharge'
							value={formData.reverseCharge}
							onChange={handleInputChange}>
							<option value='No'>No</option>
							<option value='Yes'>Yes</option>
						</select>
						<h3>Items</h3>
						{formData.items.map((item, index) => (
							<div key={index} className='item'>
								<hr />
								<label htmlFor={`item-description-${index}`}>
									Description:
								</label>
								<input
									type='text'
									id={`item-description-${index}`}
									name='description'
									value={item.description}
									onChange={(e) => handleItemChange(index, e)}
									placeholder='Enter item description'
									required
								/>
								<label htmlFor={`item-unitPrice-${index}`}>Unit Price:</label>
								<input
									type='number'
									id={`item-unitPrice-${index}`}
									name='unitPrice'
									value={item.unitPrice}
									onChange={(e) => handleItemChange(index, e)}
									placeholder='Enter unit price'
									required
								/>
								<label htmlFor={`item-quantity-${index}`}>Quantity:</label>
								<input
									type='number'
									id={`item-quantity-${index}`}
									name='quantity'
									value={item.quantity}
									onChange={(e) => handleItemChange(index, e)}
									placeholder='Enter quantity'
									required
								/>
								<label htmlFor={`item-discount-${index}`}>Discount:</label>
								<input
									type='number'
									id={`item-discount-${index}`}
									name='discount'
									value={item.discount}
									onChange={(e) => handleItemChange(index, e)}
									placeholder='Enter discount'
								/>
								<div className='sub'>
									<div>
										<label htmlFor={`item-taxRate-${index}`}>Tax Rate:</label>
										<select
											id={`item-taxRate-${index}`}
											name='taxRate'
											value={item.taxRate}
											onChange={(e) => handleItemChange(index, e)}>
											<option value={0.09}>9%</option>
											<option value={0.18}>18%</option>
										</select>
									</div>
									<button
										type='button'
										className='remove-item'
										onClick={() => removeItem(index)}>
										Remove Item
									</button>
								</div>
							</div>
						))}
						<label htmlFor='signatureImage'>Signature Image:</label>
						<input
							type='file'
							id='signatureImage'
							name='signatureImage'
							accept='image/*'
							onChange={handleImageChange}
							// required
						/>
						<div className='sub'>
							<button type='button' className='add-item' onClick={addItem}>
								Add Item
							</button>
							<button type='submit' className='generate-invoice'>
								<strong>Generate Invoice</strong>
							</button>
						</div>
					</form>
				</div>

				{show && (
					<div className='modal'>
						<div className='modal-content'>
							<InvoiceOut data={data} onClose={() => setShow(false)} />
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default InvoiceForm;
