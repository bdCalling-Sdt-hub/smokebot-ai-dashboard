import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNormalUserSignInMutation } from '../../Redux/authApis'

const UserSignUp = () => {
  // const navigate = useNavigate()
  // const onFinish = (values) => {
  //   console.log(values)
  //   toast.success('Sign up successfully!')
  //   navigate('/user-smokeBot')
  // }

  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [postSignIn, { isLoading }] = useNormalUserSignInMutation()

  const onFinish = async (values) => {
    if (!localStorage.getItem('phoneNumber')) {
      navigate('/user-signup-have-account')
    }
    try {
      await postSignIn({
        email: values.email,
        phone: localStorage.getItem('phoneNumber'),
        name: values.name,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          console.log(res)
          localStorage.setItem('user-id', res?.data?._id)
          navigate('/user-smokeBot')
        })
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center   ">
      <div>
        <div className="text-center text-4xl mb-7 font-semibold max-w-[500px] mx-auto">
          <span className="!text-blue-500">Unlock the Power of SmokeBot</span>{' '}
          by Filling out this Simple Form
        </div>
        <div className="">
          <Form layout="vertical" onFinish={onFinish} className="w-full  mt-5">
            <label htmlFor="name" className=" text-[16px] ">
              Name
            </label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input
                className="!h-[52px] px-4 rounded-full mt-0"
                placeholder="Enter your name"
              />
            </Form.Item>

            {/* <label htmlFor="phoneNumber" className=" text-[16px] ">
              Phone Number
            </label>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
              ]}
            >
              <Input
                className="!h-[52px] px-4 rounded-full mt-0"
                placeholder="Enter your phone number"
              />
            </Form.Item> */}

            <label htmlFor="email" className=" text-[16px] ">
              Email
            </label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
              className="!mt-1 "
            >
              <Input
                className="!h-[52px] px-4 rounded-full -mt-1"
                placeholder="Enter your email"
              />
            </Form.Item>

            <label htmlFor="dateOfBirth" className=" text-[16px] ">
              Date of Birth
            </label>

            <div className=" px-4  bg-blue-100 rounded-full mb-2 mt-2  ">
              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            'You must be at least 21 years old to continue.'
                          ),
                  },
                ]}
              >
                <Checkbox className="!text-[16px] ">
                  I am at least 21 years old.
                </Checkbox>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-5  font-semibold h-[42px] rounded-full"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
