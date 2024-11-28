'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Typography, Spin, Alert, Image, Divider } from 'antd'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'

const { Title, Paragraph } = Typography

function NewsDetail() {
    const { id } = useParams()

    const { data, error, isLoading } = useQuery({
        queryKey: ['newsDetail', id],
        queryFn: () =>
            fetch(`http://localhost:8080/api/news/${id}`).then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
    })

    console.log(data)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spin size="large" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <Alert
                    message="Error"
                    description={`Error loading news details: ${error.message}`}
                    type="error"
                    showIcon
                    className="shadow-md rounded-lg"
                />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <Alert
                    message="Not Found"
                    description="The requested news article could not be found."
                    type="warning"
                    showIcon
                    className="shadow-md rounded-lg"
                />
            </div>
        )
    }


    return (
        <div className="max-w-4xl mx-auto p-4 my-10">
            <article className="bg-white shadow-lg rounded-3xl overflow-hidden">

                {data.thumbnailPath && (
                    <div className="w-full flex justify-center">
                        <Image
                            src={data.thumbnailPath}
                            alt="News Thumbnail"
                            className=" object-cover rounded-md shadow-md" // Adjusted size
                        />
                    </div>
                )}


                <div className="p-6 md:p-8">
                    <Title level={1} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {data.title}
                    </Title>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span className="mr-4">{new Date(data.date).toLocaleDateString()}</span>
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span>{format(new Date(data.date), 'h:mm a')}</span>
                    </div>
                    <Divider className="my-6" />
                    <Paragraph className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {data.content}
                    </Paragraph>
                    {data.imagePaths && data.imagePaths.length > 0 && (
                        <div className="mt-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.imagePaths.map((path, index) => (
                                    <Image
                                        key={index}
                                        src={path}
                                        alt={`Additional image ${index + 1}`}
                                        className="rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    )

}

export default NewsDetail
