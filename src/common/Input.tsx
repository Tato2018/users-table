import { Field } from "formik";

const Input = ({ 
    invalid,
    errorMessage,
    id,
    ...rest }: any) => {
    return (
        <>
            <Field
                className={`border ${invalid ? "border-red-400" : "border-gray-100"
                    } text-sm pl-10 h-10 w-full border border-gray-100 rounded-lg`}
                {...rest}
            />
            {!!errorMessage && (
                <p className={`mt-1 text-red-500 text-xs italic`}>{errorMessage}</p>
            )}
        </>
    );
};

export default Input