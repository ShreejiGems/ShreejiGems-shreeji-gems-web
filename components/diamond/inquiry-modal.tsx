"use client";
import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { garamond } from '@/src/common/helper';

interface InquiryModalProps {
    isVisible: boolean;
    onClose: () => void;
    diamondData: {
        name: string;
        price: string;
        specifications: {
            certificateNumber: string;
        };
    };
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isVisible, onClose, diamondData }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {        
        message.success('Your inquiry has been submitted successfully!');
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Diamond Inquiry"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width={500}
            className={garamond.className}
        >
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {diamondData.name}
                </h3>
                <p className="text-gray-600 mb-1">{diamondData.price}</p>
                <p className="text-sm text-gray-500">
                    Certificate: {diamondData.specifications.certificateNumber}
                </p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                >
                    <Input.TextArea 
                        rows={4} 
                        placeholder="Please let us know your requirements or any questions about this diamond..."
                    />
                </Form.Item>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        className="bg-gray-600 hover:bg-gray-700 border-gray-600"
                        style={{ backgroundColor: '#8B8B8B', borderColor: '#8B8B8B' }}
                    >
                        Submit Inquiry
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default InquiryModal;
