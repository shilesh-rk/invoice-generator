
# Invoice Generator

This document details the implementation of an Invoice Generator Web App using React. The system comprises two main components: InvoiceForm for inputting invoice data and InvoiceOut for displaying and downloading the generated invoice.


##  Components
#### InvoiceForm :
The InvoiceForm component is responsible for collecting all necessary invoice details from the user. It uses various input fields for details such as company information, billing and shipping addresses, order and invoice details, and individual item information.

Implementation
- The detailed code for InvoiceForm is located in [invoiceForm.jsx](https://github.com/shilesh-rk/invoice-generator/blob/master/src/pages/InvoiceForm.jsx)
#### Invoice Data
The InvoiceOut component is responsible for displaying the invoice based on the data collected from InvoiceForm. It also provides functionality to download the invoice as a PDF.

Implementation
- The detailed code for InvoiceForm is located in [invoiceOut.jsx](https://github.com/shilesh-rk/invoice-generator/blob/master/src/pages/InvoiceOut.jsx)
#### Calculations
The InvoiceContext provides the necessary context for handling functionality, which is used in the InvoiceOut component.
The detailed code for InvoiceForm is located in [invoiceContext.jsx](https://github.com/shilesh-rk/invoice-generator/blob/master/src/pages/InvoiceContext.jsx)

#### Conclusion
This solution includes a comprehensive invoice generator implemented using React. It consists of InvoiceForm for input collection and InvoiceOut for displaying and downloading the invoice as a PDF. The InvoiceContext is used to manage shared state and functionality, such as converting numbers to words,Calculations. This approach ensures modularity, reusability, and maintainability of the code.
