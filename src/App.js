import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';
import Clear from './components/Clear';
import Alert from './components/Alert';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
};

const App = () => {
    const [item, setItem] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const handleChange = (e) => setItem(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item) {
            showAlert(true, "please enter value", "danger");
        } else if (item && isEditing) {
            setList(list.map((i) => {
                if (i.id === editID) {
                    return { ...i, title: item };
                } else {
                    return i;
                }
            }));
            setItem('');
            setEditID(null);
            setIsEditing(false);
            showAlert(true, 'item updated', 'success');
        } else if (item.length > 25) {
            showAlert(true, 'value length too long', 'danger');
        } else {
            showAlert(true, "item added", "success");
            const newItem = { id: Math.floor(Math.random() * 1000), title: item };
            setList([...list, newItem]);
            setItem('');
        }
    };

    const showAlert = (show = false, msg = "", type = "") => {
        setAlert({ show, type, msg });
    };

    const removeItem = (id) => {
        showAlert(true, "item removed", "danger");
        setList(list.filter((item) => item.id !== id));
    };

    const editItem = (id) => {
        const itemToEdit = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setItem(itemToEdit.title);
    };

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    return (
        <main>
            <Header />
            {alert.show &&
                <Alert
                    {...alert}
                    removeAlert={showAlert}
                    list={list} />}
            <Form
                addItem={handleSubmit}
                value={item}
                changeValue={handleChange}
                isEditing={isEditing} />
            {
                list.length > 0 && (
                    <>
                        <List
                            items={list}
                            removeItem={removeItem}
                            editItem={editItem} />

                        <Clear
                            list={list}
                            showAlert={showAlert}
                            setList={setList}
                        />
                    </>
                )
            }
        </main>
    );
};

export default App;