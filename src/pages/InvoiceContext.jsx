import React, { createContext, useState } from "react";

// Create the context
export const InvoiceContext = createContext();

// Create a provider component
export const InvoiceProvider = ({ children }) => {
	const [show, setShow] = useState(false);

	const performCalculations = (data) => {
		const calculateAmount = (item) => {
			return item.quantity * item.unitPrice - item.discount;
		};

		const updatedItems = data.items.map((item) => {
			const netAmount = calculateAmount(item);
			const updatedItem = { ...item, netAmount };

			if (data.placeOfSupply === data.placeOfDelivery) {
				updatedItem.cgst = netAmount * 0.09;
				updatedItem.sgst = netAmount * 0.09;
				updatedItem.taxAmount = updatedItem.cgst + updatedItem.sgst;
				updatedItem.taxType = "CGST & SGST";
			} else {
				updatedItem.igst = netAmount * 0.18;
				updatedItem.taxAmount = updatedItem.igst;
				updatedItem.taxType = "IGST";
			}
			updatedItem.totalAmount = netAmount + updatedItem.taxAmount;
			return updatedItem;
		});

		const totalAmount = updatedItems.reduce(
			(acc, item) => acc + item.totalAmount,
			0
		);
		const totalTaxAmount = updatedItems.reduce(
			(acc, item) => acc + item.taxAmount,
			0
		);

		return {
			...data,
			items: updatedItems,
			totalAmount,
			totalTaxAmount,
			amountInWords: numberToWords(totalAmount),
		};
	};

	const numberToWords = (num) => {
		if (num === 0) return "zero";

		const ones = [
			"",
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
			"ten",
			"eleven",
			"twelve",
			"thirteen",
			"fourteen",
			"fifteen",
			"sixteen",
			"seventeen",
			"eighteen",
			"nineteen",
		];

		const tens = [
			"",
			"",
			"twenty",
			"thirty",
			"forty",
			"fifty",
			"sixty",
			"seventy",
			"eighty",
			"ninety",
		];

		const scales = ["", "thousand", "million"];

		let word = "";

		for (let i = 0; i < scales.length; i++) {
			let unit = Math.floor(num / Math.pow(1000, scales.length - i - 1)) % 1000;
			if (unit > 0) {
				let hundreds = Math.floor(unit / 100);
				let remainder = unit % 100;
				let tensUnit = Math.floor(remainder / 10);
				let onesUnit = remainder % 10;

				if (hundreds > 0) {
					word += ones[hundreds] + " hundred ";
				}

				if (remainder > 0) {
					if (remainder < 20) {
						word += ones[remainder] + " ";
					} else {
						word += tens[tensUnit] + " " + ones[onesUnit] + " ";
					}
				}

				word += scales[scales.length - i - 1] + " ";
			}
		}

		return word.trim();
	};

	return (
		<InvoiceContext.Provider
			value={{
				performCalculations,
				numberToWords,
				show,
				setShow,
			}}>
			{children}
		</InvoiceContext.Provider>
	);
};
