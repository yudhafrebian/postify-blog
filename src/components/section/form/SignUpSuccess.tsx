import { useAppDispatch } from '@/app/hook';
import { setFormType } from '@/utils/redux/feature/formSlice';
import { Button } from '@heroui/button';
import { CardBody, CardHeader } from '@heroui/card';
import Link from 'next/link';
import * as React from 'react';

const SignUpSuccess= () => {
    const dispatch =useAppDispatch();
  return (
    <CardBody>
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='font-bold text-center'>Sign Up Success</h1>
            <p className='text-center font-light'>You account has been successfully created, click the button below to Sign In</p>
            <Button onPress={() => dispatch(setFormType("signin"))} variant='solid' color='primary'>Sign In</Button>
        </div>
    </CardBody>
  )
};

export default SignUpSuccess;
