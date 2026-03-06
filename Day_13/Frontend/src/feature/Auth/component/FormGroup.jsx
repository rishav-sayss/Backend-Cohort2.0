import React, { useState } from "react";
import "../component/form.scss"
const FormGroup = ({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    required = false,
    error
}) => {

    const [showPassword, setShowPassword] = useState(false)
    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type

    return (
        <div className="form-group">

            <label htmlFor={label}>
                {label}
            </label>

            <div className="input-wrapper">
                <input
                    id={label}
                    name={label}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />

                {type === "password" && (
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁"}
                    </span>
                )}
            </div>

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default FormGroup;