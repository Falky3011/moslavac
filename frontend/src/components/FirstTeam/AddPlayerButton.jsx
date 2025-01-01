import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

const AddPlayerButton = ({ title, onClick }) => (
    <div
        onClick={onClick}
        className="w-36 h-56 m-2 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition"
    >
        <PlusOutlined className="text-2xl text-gray-400" />
        <p className="text-sm text-gray-500 mt-2">Add {title}</p>
    </div>
);

export default AddPlayerButton;
