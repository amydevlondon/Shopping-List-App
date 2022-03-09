import React from 'react';

export const Form = ({ addItem, value, changeValue, isEditing }) => {

    return (
        <form className="shopping-form" onSubmit={addItem}>
            <input
                type="text"
                placeholder="Add item"
                value={value}
                onChange={changeValue} />
            <button type="submit" className="submit">
                {isEditing ? 'edit' : 'submit'}
            </button>
        </form>
    );
};

export default Form;