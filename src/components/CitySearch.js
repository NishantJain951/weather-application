import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';

const CitySearch = ({ onSearch, value, placeholder }) => {
  const [initialValues, setInitialValues] = useState({
    city: "",
  });

  const validationSchema = Yup.object({
    city: Yup.string().required('')
  })

  useEffect(() => {
    if(value) {
      setInitialValues({city: value});
    }
  }, [value])

  const handleSubmit = (values) => {
    onSearch(values.city);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange }) => (
        <Form>
          <input
            type="text"
            name="city"
            placeholder={placeholder ? placeholder : "Search city here"}
            value={values.city} 
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </Form>
      )}
    </Formik>
  );
};

export default CitySearch;