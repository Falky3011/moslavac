import React from "react";
import { Button, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import grb from "../../../public/grb.png";

const NewsTable = ({ news, onView, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Thumbnail
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Naslov
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Datum
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sadržaj
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Akcije
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {news?.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2 whitespace-nowrap">
              <img
                src={item.thumbnailPath || grb}
                alt="Thumbnail"
                className="w-12 h-12 object-cover rounded"
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {item.title}
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="text-sm text-gray-500">
                {moment(item.date).format("YYYY-MM-DD HH:mm")}
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {item.content}
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
              <Button
                icon={<EyeOutlined />}
                onClick={() => onView(item)}
                className="mr-2"
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => onEdit(item)}
                className="mr-2"
              />
              <Popconfirm
                title="Jeste li sigurni da želite izbrisati ovu vijest?"
                onConfirm={() => onDelete(item.id)}
                okText="Da"
                cancelText="Ne"
              >
                <Button icon={<DeleteOutlined />} />
              </Popconfirm>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default NewsTable;
