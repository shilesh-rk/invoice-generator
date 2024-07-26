import React from "react";
import { InvoiceProvider } from "./pages/InvoiceContext";
import InvoiceForm from "./pages/InvoiceForm";
import "./App.css"

function App() {
	return (
		<InvoiceProvider>
			<InvoiceForm />
		</InvoiceProvider>
	);
}

export default App;
