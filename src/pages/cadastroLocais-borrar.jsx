import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const MyForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [cepApi, setCepApi] = useState('');

    const handleChange = (e) => {
        setCepApi(e.target.value); // Update the state when the input value changes
    };

    const onSubmit = (data) => {
        // Handle form submission
        console.log('Form data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                placeholder="CEP"
                type="number"
                sx={{ mt: 1, width: '16em' }}
                variant="outlined"
                onChange={handleChange} // Handle input value changes
                {...register("cep", {
                    required: "Campo Obrigatorio",
                    minLength: {
                        value: 8,
                        message: "Mínimo 8 caracteres"
                    },
                    maxLength: {
                        value: 8,
                        message: "Máximo de 8 caracteres"
                    }
                })}
            />
            {errors.cep && <p style={{ color: 'red' }}>{errors.cep.message}</p>}
            {/* Display the value dynamically */}
            <p>Value entered: {cepApi}</p>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
