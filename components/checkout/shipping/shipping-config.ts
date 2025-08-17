const ShippingFormConfig = {
    fields: [
        { label: "First Name", name: "firstName", type: "text", isRequired: true },
        { label: "Last Name", name: "lastName", type: "text", isRequired: true },
        { label: "Email", name: "email", type: "email", isRequired: true },
        { label: "Address", name: "address", type: "text", isRequired: true },
        { label: "Phone", name: "phone", type: "tel", isRequired: true, },
        { label: "Country", name: "country", type: "text", isRequired: false },
        { label: "City", name: "city", type: "text", isRequired: false },
        { label: "Postal Code", name: "postalCode", type: "text", isRequired: false },
    ],
};
export default ShippingFormConfig;