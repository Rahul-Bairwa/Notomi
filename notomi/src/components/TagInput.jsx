import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTag = (event) => {
        event.preventDefault();
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div style={styles.tagInput}>
            <form onSubmit={handleAddTag} style={styles.form}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add a tag"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add</button>
            </form>
            <ul style={styles.tagList}>
                {tags.map((tag, index) => (
                    <li key={index} style={styles.tag}>
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} style={styles.removeButton}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    tagInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    input: {
        padding: '5px',
        marginRight: '5px',
    },
    button: {
        padding: '5px 10px',
        cursor: 'pointer',
    },
    tagList: {
        listStyleType: 'none',
        padding: '0',
        display: 'flex',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '3px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        marginLeft: '5px',
        cursor: 'pointer',
    },
};

export default TagInput;
