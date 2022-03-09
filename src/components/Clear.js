import React from 'react';

export const Clear = ({ list, showAlert, setList }) => {

    const clearList = () => {
        showAlert(true, "list cleared", "danger");
        setList([]);
    };

    return (
        <div className="clear">
            <p className="list-length">
                {list.length} {list.length < 2 ? "item" : "items"}
            </p>
            <button className="clear" onClick={clearList}>clear list</button>
        </div>
    );
};

export default Clear;