import React from 'react';

export const List = ({ items, removeItem, editItem }) => {
    return (
        <ul className="shopping-list">
            {
                items.map((item) => {
                    const { id, title } = item;
                    return (
                        <li key={id} className="shopping-item">
                            <p className="item-title">
                                {title}
                            </p>
                            <div className="btn-container">
                                <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() => editItem(id)}>
                                    <i className="fas fa-edit" />
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => removeItem(id)}>
                                    <i className="fas fa-trash" />
                                </button>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default List;